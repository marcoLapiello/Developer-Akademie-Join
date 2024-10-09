export function renderDetails() {
  const contactDetailsRef = document.getElementById("contactDetails");
  contactDetailsRef.innerHTML = renderDetailsTemplate();
}

function renderDetailsTemplate() {
  return /*html*/ `
        <p>Hallo Welt</p>
    `;
}
