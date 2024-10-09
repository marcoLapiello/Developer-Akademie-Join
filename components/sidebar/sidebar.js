// const sideBarElements = document.querySelectorAll('sidebar-Block a');
// const windowPathName = window.location.pathname;

// sideBarElements.forEach(sideBarElements => {
//     const sideBarElementsPathname = new URL(sideBarElement.href).pathname;
//     if (windowPathName == sideBarElementsPathname) {
//         sideBarElements.classList.add('active');
//     }
// });


export function renderSidebar() {
    const sidebarRef = document.getElementById('sidebar');
    sidebarRef.innerHTML += renderSidebarTemplate()
}

function renderSidebarTemplate() {
    return /*html*/`
    <div>
        <img src="/assets/icons/joinLogo.png" />
    </div>
        <div class="sidebar-Block">
            <a id="summary" href="/summary.html"><img src="/assets/icons/Summary.png" /></a>
            <a id="addTask" href="/addTask.html"><img src="/assets/icons/addTask.png" /></a>
            <a id="board" href="/board.html"><img src="/assets/icons/board.png" /></a>
            <a id="contacts" href="/contacts.html"><img src="/assets/icons/contact.png" /></a>
        </div>
        <div id="informations">
            <a href="/privacyPolicy.html"><img src="/assets/icons/privacyPolicy.png" /></a>
            <a href=" /legalNotice.html"><img src="/assets/icons/legalNotice.png" /></a>
    </div>    
`
}