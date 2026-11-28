function serializeLinkExport(linkData, mode, indentation){
  if(mode === "encrypted" || mode === "plain"){
    return JSON.stringify(linkData, null, indentation);
  }
  return JSON.stringify(linkData, (key, value) => {
    if(key === "accounts" || key === "accountId" || key === "password" || key === "encryptedAccounts"){
      return undefined;
    }
    return value;
  }, indentation);
}

function chooseAccountExport(exportData){
  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-label", "JSON出力の設定");
  dialog.innerHTML = `
    <form method="dialog">
      <fieldset><legend>アカウント情報（ID・パスワード・説明）</legend>
        <label><input type="radio" name="accountMode" value="omit" checked>含めない</label><br>
        <label><input type="radio" name="accountMode" value="encrypted">暗号化して含める</label><br>
        <label><input type="radio" name="accountMode" value="plain">平文で含める</label>
      </fieldset>
      <p>平文ファイルに含まれるパスワードは、そのファイルを開ける人が読めます。</p>
      <button type="submit" value="cancel">キャンセル</button>
      <button type="submit" value="export">出力</button>
    </form>`;
  const form = dialog.querySelector("form");
  form.addEventListener("submit", async event => {
    if(event.submitter?.value === "export"){
      event.preventDefault();
      const mode = form.elements.accountMode.value;
      dialog.close();
      try {
        await exportData(mode);
      } catch (error) {
        alert("JSONを出力できませんでした。\n" + error.message);
      }
    }
  });
  dialog.addEventListener("close", () => dialog.remove(), {once: true});
  document.body.appendChild(dialog);
  dialog.showModal();
}
