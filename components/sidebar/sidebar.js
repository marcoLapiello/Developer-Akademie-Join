export function renderSidebar() {
    const sidebarRef = document.getElementById('sidebar');
    sidebarRef.innerHTML += renderSidebarTemplate()
    const pageIdMap = {
        '/contacts.html': 'contacts',
        '/summary.html': 'summary',
        '/addTask.html': 'addTask',
        '/board.html': 'board',
        '/privacyPolicy.html': 'privacyPolicy',
        '/legalNotice.html': 'legalNotice',
    }
    const currentPath = window.location.pathname;
    const activeElementId = pageIdMap[currentPath];
    if (activeElementId) {
        const activeElement = document.getElementById(activeElementId);
        activeElement.classList.add('active');
    }
}

function renderSidebarTemplate() {
    return /*html*/`
    <div>
        <img src="/assets/icons/joinLogo.png" />
    </div>
        <div class="sidebar-Block">
            <a  class="" href="/summary.html"><img src="/assets/icons/summaryicon.png" />Summary</a>
            <a  class="" href="/addTask.html"><img src="/assets/icons/addTaskIcon.png" />Add Task</a>
            <a class ="" href="/board.html"><img src="/assets/icons/boardicon.png" /> Block </a>
            <a  class="" href="/contacts.html"><img src="/assets/icons/contactIcon.png" /> Contacts</a>
        </div>
        <div id="informations">
            <a id="privacyPolicy" href="/privacyPolicy.html">Privacy Policy</a>
            <a id="legalNotice" href="/legalNotice.html">Legal Notice</a>
    </div>    
`
}