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
            <a id="summary" class="" href="/summary.html"><img src="/assets/icons/Summary.png" /></a>
            <a id="addTask" class="" href="/addTask.html"><img src="/assets/icons/addTask.png" /></a>
            <a id="board" class="" href="/board.html"><img src="/assets/icons/board.png" /></a>
            <a id="contacts" class="" href="/contacts.html"><img src="/assets/icons/contact.png" /></a>
        </div>
        <div id="informations">
            <a id="privacyPolicy" href="/privacyPolicy.html"><img src="/assets/icons/privacyPolicy.png" /></a>
            <a id="legalNotice" href="/legalNotice.html"><img src="/assets/icons/legalNotice.png" /></a>
    </div>    
`
}