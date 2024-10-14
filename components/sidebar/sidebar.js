export function renderSidebar() {
  const sidebarRef = document.getElementById("sidebar");
  if (sidebarRef) sidebarRef.innerHTML += renderSidebarTemplate();
}

const urlPath = window.location.pathname;

function renderSidebarTemplate() {
  return /*html*/ `
    
      <div class="sidebarUpperPart">
        <img class= "joinLogo"  src="/assets/icons/joinLogo.png" />
      <div class="sidebar-Block">
        <a class="${urlPath === "/Summary" ? "active" : ""}" href="/summary.html"><img src="/assets/icons/summaryicon.png" />Summary</a>
        <a class="${urlPath === "/Add Task" ? "active" : ""}" href="/addTask.html"><img src="/assets/icons/addTaskIcon.png" />Add Task</a>
        <a class="${urlPath === "/board.html" ? "active" : ""}" href="/board.html"><img src="/assets/icons/boardicon.png" />Board</a>
        <a class="${urlPath === "/contacts.html" ? "active" : ""}" href="/contacts.html"><img src="/assets/icons/contactIcon.png" />Contacts</a>
      </div>

      <div id="information">
        <a class="${urlPath === "/privacyPolicy.html" ? "active" : ""}" id="privacyPolicy" href="/privacyPolicy.html">Privacy Policy</a>
        <a class="${urlPath === "/legalNotice.html" ? "active" : ""}" id="legalNotice" href="/legalNotice.html">Legal Notice</a>
      </div>
  `;
}
