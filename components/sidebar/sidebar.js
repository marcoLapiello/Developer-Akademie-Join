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

        <div class="${urlPath === "/summary.html" ? "active" : ""} navElement">
          <img src="/assets/icons/summaryIcon.png" alt="">  
          <a href="">Summary</a>
        </div> 
        <div class="${urlPath === "/addTask.html" ? "active" : ""} navElement">
          <img src="/assets/icons/addTaskIcon.png" alt="">  
          <a href="">Add Task</a>
        </div>
        <div class="${urlPath === "/board.html" ? "active" : ""} navElement">
          <img src="/assets/icons/boardIcon.png" alt="">  
          <a href="">Board</a>
        </div>
        <div class="${urlPath === "/contacts.html" ? "active" : ""} navElement">
          <img src="/assets/icons/contactIcon.png" alt="">  
          <a href="">Contacts</a>
        </div>
      </div>

      <div id="information">
        <a class="${urlPath === "/privacyPolicy.html" ? "active" : ""}" id="privacyPolicy" href="/privacyPolicy.html">Privacy Policy</a>
        <a class="${urlPath === "/legalNotice.html" ? "active" : ""}" id="legalNotice" href="/legalNotice.html">Legal Notice</a>
      </div>
  `;
}
