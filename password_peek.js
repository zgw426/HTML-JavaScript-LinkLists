const PASSWORD_MASK = "*****";

function renderPasswordEye(closed = false){
  const eye = closed
    ? "<path d='M2 8c2.8 4 6.1 6 10 6s7.2-2 10-6M5 12l-2 3m6-1-1 4m7-4 1 4m3-6 2 3'/>"
    : "<path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z'/><circle cx='12' cy='12' r='3'/>";
  return "<svg aria-hidden='true' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>" + eye + "</svg>";
}

function renderPasswordPeekButton(linkIndex, accountIndex){
  const accountAttributes = " data-link-index='" + linkIndex + "' data-account-index='" + accountIndex + "'";
  return " <button type='button' class='password_peek' aria-label='押している間だけパスワードを表示' title='押している間だけパスワードを表示'" + accountAttributes + ">"
    + renderPasswordEye() + "</button>";
}

function installPasswordPeek(readPassword){
  let activePeek = null;

  function hide(){
    if(!activePeek) return;
    activePeek.conceal();
    activePeek = null;
  }

  function show(button, hold){
    hide();
    const field = button.previousElementSibling;
    if(!field?.matches(".password_value")) return;
    const password = readPassword(button);
    if(typeof password !== "string" || !password) return;
    field.textContent = password;
    activePeek = {button, conceal: () => { field.textContent = PASSWORD_MASK; }, ...hold};
  }

  document.addEventListener("pointerdown", event => {
    const button = event.target.closest?.(".password_peek");
    if(button && event.button === 0 && event.isPrimary){
      show(button, {pointerId:event.pointerId});
    }
  });

  for(const type of ["pointerup", "pointercancel"]){
    window.addEventListener(type, event => {
      if(activePeek?.pointerId === event.pointerId) hide();
    }, true);
  }

  document.addEventListener("pointerout", event => {
    const peek = activePeek;
    if(peek && peek.pointerId === event.pointerId && peek.button.contains(event.target)
        && !peek.button.contains(event.relatedTarget)){
      hide();
    }
  });

  document.addEventListener("keydown", event => {
    if(event.key === "Escape") hide();
    const button = event.target.closest?.(".password_peek");
    if(button && (event.key === " " || event.key === "Enter")){
      event.preventDefault();
      if(!event.repeat) show(button, {key:event.key});
    }
  });

  window.addEventListener("keyup", event => {
    if(activePeek?.key === event.key) hide();
  }, true);

  document.addEventListener("focusout", event => {
    if(activePeek?.button === event.target) hide();
  });
  window.addEventListener("blur", hide);
  window.addEventListener("pagehide", hide);
  document.addEventListener("visibilitychange", () => {
    if(document.hidden) hide();
  });
  return hide;
}
