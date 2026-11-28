// Only encrypted envelopes are stored with links. Trusted keys stay in this browser's IndexedDB.
const accountVault = (() => {
  const iterations = 600000;
  const keys = new Map();
  const decrypted = new Map();
  let newSalt;
  let queue = Promise.resolve();

  const encode = bytes => btoa(Array.from(new Uint8Array(bytes), byte => String.fromCharCode(byte)).join(""));
  const decode = text => Uint8Array.from(atob(text), char => char.charCodeAt(0));
  const random = size => crypto.getRandomValues(new Uint8Array(size));

  function run(task){
    const result = queue.then(task);
    queue = result.catch(() => {});
    return result;
  }

  function trustStore(mode, action){
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("LinkListsAccountKeys", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("keys");
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("信頼設定の保存領域を開けません。"));
      request.onsuccess = () => {
        const db = request.result;
        try {
          const tx = db.transaction("keys", mode);
          const operation = action(tx.objectStore("keys"));
          tx.oncomplete = () => { db.close(); resolve(operation.result); };
          tx.onabort = () => { db.close(); reject(tx.error); };
        } catch (error) {
          db.close();
          reject(error);
        }
      };
    });
  }

  function askPassphrase(creating){
    return new Promise(resolve => {
      const dialog = document.createElement("dialog");
      dialog.setAttribute("aria-label", "アカウント情報の暗号化");
      dialog.innerHTML = `
        <form method="dialog">
          <p>${creating ? "マスターパスフレーズを設定してください（12文字以上）。" : "マスターパスフレーズを入力してください。"}</p>
          <label>パスフレーズ <input name="passphrase" type="password" required autocomplete="${creating ? "new-password" : "current-password"}" autofocus></label>
          ${creating ? '<p><label>確認 <input name="confirmation" type="password" required autocomplete="new-password"></label></p>' : ""}
          <p><label><input name="trust" type="checkbox">このブラウザを信頼する</label></p>
          <p>このブラウザのプロファイルを使える人は、再入力なしで解除できます。</p>
          <button type="submit" value="cancel" formnovalidate>キャンセル</button>
          <button type="submit" value="unlock">${creating ? "設定" : "解除"}</button>
        </form>`;
      const form = dialog.querySelector("form");
      const input = form.elements.passphrase;
      let choice;
      input.oninput = () => input.setCustomValidity("");
      if(creating) form.elements.confirmation.oninput = input.oninput;
      form.onsubmit = event => {
        if(event.submitter?.value !== "unlock") return;
        if(creating && (input.value.length < 12 || input.value !== form.elements.confirmation.value)){
          event.preventDefault();
          input.setCustomValidity("12文字以上の同じパスフレーズを2か所に入力してください。");
          input.reportValidity();
          return;
        }
        choice = {passphrase: input.value, trust: form.elements.trust.checked};
      };
      dialog.onclose = () => { dialog.remove(); resolve(choice); };
      document.body.appendChild(dialog);
      dialog.showModal();
    });
  }

  async function derive(passphrase, salt){
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({name:"PBKDF2", hash:"SHA-256", salt:decode(salt), iterations},
      base, {name:"AES-GCM", length:256}, false, ["encrypt", "decrypt"]);
  }

  function identity(envelope){
    if(envelope?.version !== 1 || !/^[A-Za-z0-9+/]{22}==$/.test(envelope.salt) ||
        !/^[A-Za-z0-9+/]{16}$/.test(envelope.iv) || typeof envelope.data !== "string"){
      throw new Error("未対応または破損したアカウント暗号データです。");
    }
    return envelope.salt + ":" + envelope.iv + ":" + envelope.data;
  }

  async function decrypt(envelope, key){
    const bytes = await crypto.subtle.decrypt({name:"AES-GCM", iv:decode(envelope.iv)}, key, decode(envelope.data));
    const accounts = JSON.parse(new TextDecoder().decode(bytes));
    if(!Array.isArray(accounts)) throw new Error("アカウント情報の形式が正しくありません。");
    return accounts;
  }

  async function readTrustedKey(salt){
    try { return await trustStore("readonly", store => store.get(salt)); }
    catch { return undefined; }
  }

  async function getKey(salt, envelope){
    if(keys.has(salt)) return keys.get(salt);
    if(!globalThis.crypto?.subtle) throw new Error("この環境では暗号化を利用できません。");
    if(envelope){
      const trustedKey = await readTrustedKey(salt);
      if(trustedKey){
        try {
          decrypted.set(identity(envelope), await decrypt(envelope, trustedKey));
          keys.set(salt, trustedKey);
          return trustedKey;
        } catch {}
      }
    }
    const choice = await askPassphrase(!envelope);
    if(!choice) throw new Error("暗号化・解除をキャンセルしました。");
    const key = await derive(choice.passphrase, salt);
    if(envelope){
      try { decrypted.set(identity(envelope), await decrypt(envelope, key)); }
      catch { throw new Error("パスフレーズが違うか、暗号データが破損しています。"); }
    }
    keys.set(salt, key);
    if(choice.trust){
      try { await trustStore("readwrite", store => store.put(key, salt)); }
      catch { alert("このブラウザに信頼設定を保存できませんでした。次回は再入力が必要です。"); }
    }
    return key;
  }

  function plaintext(item){
    const accounts = Array.isArray(item.accounts)
      ? item.accounts.filter(account => account && (account.accountId || account.password))
      : [];
    if(item.accountId || item.password) accounts.push({accountId:item.accountId || "", password:item.password || ""});
    return accounts;
  }

  function strip(item){
    const {accounts, accountId, password, encryptedAccounts, ...other} = item;
    return other;
  }

  async function open(envelope, siblings = []){
    const id = identity(envelope);
    if(decrypted.has(id)) return decrypted.get(id);
    const key = await getKey(envelope.salt, envelope);
    if(!decrypted.has(id)) decrypted.set(id, await decrypt(envelope, key));
    for(const sibling of siblings){
      if(sibling?.salt !== envelope.salt) continue;
      try {
        const siblingId = identity(sibling);
        if(!decrypted.has(siblingId)) decrypted.set(siblingId, await decrypt(sibling, key));
      } catch {
        // A damaged entry must not prevent opening the other links.
      }
    }
    return decrypted.get(id);
  }

  async function openAvailable(envelopes){
    if(!globalThis.crypto?.subtle) return;
    const trustedKeys = new Map();
    for(const envelope of envelopes){
      try {
        const id = identity(envelope);
        if(decrypted.has(id)) continue;
        const salt = envelope.salt;
        if(!keys.has(salt) && !trustedKeys.has(salt)){
          trustedKeys.set(salt, await readTrustedKey(salt));
        }
        const key = keys.get(salt) || trustedKeys.get(salt);
        if(!key) continue;
        decrypted.set(id, await decrypt(envelope, key));
        keys.set(salt, key);
      } catch {
        // Leave damaged or unavailable accounts locked without interrupting the list.
      }
    }
  }

  async function openLinks(linkData, siblings){
    const list = [];
    for(const item of linkData.list){
      const accounts = item.encryptedAccounts ? await open(item.encryptedAccounts, siblings) : plaintext(item);
      list.push(accounts.length ? {...strip(item), accounts} : strip(item));
    }
    return {...linkData, list};
  }

  async function sealLinks(linkData, preferredEnvelope){
    const list = [];
    for(const item of linkData.list){
      const accounts = plaintext(item);
      if(item.encryptedAccounts){
        identity(item.encryptedAccounts);
        if(accounts.length) throw new Error("暗号文と平文のアカウント情報が同じリンクにあります。");
        list.push({...strip(item), encryptedAccounts:item.encryptedAccounts});
      }else if(accounts.length){
        if(!globalThis.crypto?.subtle) throw new Error("この環境では暗号化を利用できません。");
        const salt = preferredEnvelope?.salt || (newSalt ??= encode(random(16)));
        if(preferredEnvelope) identity(preferredEnvelope);
        const key = await getKey(salt, preferredEnvelope);
        const iv = random(12);
        const data = await crypto.subtle.encrypt({name:"AES-GCM", iv}, key, new TextEncoder().encode(JSON.stringify(accounts)));
        const envelope = {version:1, salt, iv:encode(iv), data:encode(data)};
        decrypted.set(identity(envelope), accounts);
        list.push({...strip(item), encryptedAccounts:envelope});
      }else{
        list.push(strip(item));
      }
    }
    return {...linkData, list};
  }

  function cached(envelope){
    try { return decrypted.get(identity(envelope)) || []; } catch { return []; }
  }

  async function forget(){
    await trustStore("readwrite", store => store.clear());
    keys.clear();
    decrypted.clear();
    newSalt = undefined;
  }

  async function isTrusted(){
    if(!globalThis.indexedDB) return false;
    return (await trustStore("readonly", store => store.count())) > 0;
  }

  return {run, plaintext, open, openAvailable, openLinks, sealLinks, cached, forget, isTrusted};
})();

function storedAccountEnvelopes(){
  return linkListKeys.flatMap(key => (getLinkDataFromStorage(key)?.list || [])
    .map(item => item?.encryptedAccounts).filter(Boolean));
}

// Run migration only from an explicit account action. Prepare all replacements before writing.
async function migrateStoredAccounts(){
  const preferred = storedAccountEnvelopes()[0];
  const replacements = [];
  for(const listKey of linkListKeys){
    const storageKey = getLinkStorageKey(listKey);
    const before = storage.getItem(storageKey);
    const linkData = getLinkDataFromStorage(listKey);
    if(linkData?.list.some(item => item && accountVault.plaintext(item).length)){
      const after = await accountVault.sealLinks(linkData, preferred);
      replacements.push({storageKey, before, after:JSON.stringify(after)});
    }
  }
  if(replacements.some(({storageKey,before}) => storage.getItem(storageKey) !== before)){
    throw new Error("登録内容が変更されました。もう一度操作してください。");
  }
  const written = [];
  try {
    for(const replacement of replacements){
      storage.setItem(replacement.storageKey, replacement.after);
      written.push(replacement);
    }
  } catch (error) {
    // Restoring the smaller plaintext entries frees space if the write exceeded quota.
    for(const {storageKey,before} of written.reverse()) storage.setItem(storageKey, before);
    throw error;
  }
  return replacements.length;
}

async function accountEditorOperation(action, linkData){
  return accountVault.run(async () => {
    if(action === "trustStatus") return accountVault.isTrusted();
    if(action === "open"){
      const {listKey, storedValue, data} = linkData;
      const storageKey = getLinkStorageKey(listKey);
      if(storage.getItem(storageKey) !== storedValue){
        throw new Error("登録内容が変更されました。設定一覧から開き直してください。");
      }
      await migrateStoredAccounts();
      const currentValue = storage.getItem(storageKey);
      const opened = await accountVault.openLinks(getLinkDataFromStorage(listKey) || data, storedAccountEnvelopes());
      return {data:opened, storedValue:currentValue};
    }
    if(action === "seal"){
      const {listKey, data} = linkData;
      if(data.list.some(item => accountVault.plaintext(item).length)) await migrateStoredAccounts();
      const preferred = getLinkDataFromStorage(listKey)?.list.find(item => item.encryptedAccounts)?.encryptedAccounts;
      return accountVault.sealLinks(data, preferred || storedAccountEnvelopes()[0]);
    }
    if(action === "export"){
      return prepareAccountExport(linkData.data, linkData.mode);
    }
    throw new Error("未対応のアカウント操作です。");
  });
}

async function prepareAccountExport(linkData, mode){
  if(mode === "encrypted") return accountVault.sealLinks(linkData, storedAccountEnvelopes()[0]);
  if(mode === "plain") return accountVault.openLinks(linkData, storedAccountEnvelopes());
  return linkData;
}
