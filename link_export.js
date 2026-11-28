function serializeLinkExport(linkData, includeAccountInfo, indentation){
  if(includeAccountInfo){
    return JSON.stringify(linkData, null, indentation);
  }
  return JSON.stringify(linkData, (key, value) => {
    if(key === "accounts" || key === "accountId" || key === "password"){
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
      <p><label><input type="checkbox" name="includeAccountInfo">
        アカウント情報（ID・パスワード・説明）を含める
      </label></p>
      <p>含める場合、出力ファイルにパスワードが平文で保存されます。</p>
      <button type="submit" value="cancel">キャンセル</button>
      <button type="submit" value="export">出力</button>
    </form>`;
  const form = dialog.querySelector("form");
  form.addEventListener("submit", event => {
    if(event.submitter?.value === "export"){
      try {
        exportData(form.elements.includeAccountInfo.checked);
      } catch (error) {
        alert("JSONを出力できませんでした。保存データを確認してください。");
      }
    }
  });
  dialog.addEventListener("close", () => dialog.remove(), {once: true});
  document.body.appendChild(dialog);
  dialog.showModal();
}
