const sideBarElements = document.querySelectorAll('sidebar-Block a');
const windowPathName = window.location.pathname;

sideBarElements.forEach(sideBarElements => {
    const sideBarElementsPathname = new URL(sideBarElement.href).pathname;
    if (windowPathName == sideBarElementsPathname) {
        sideBarElements.classList.add('active');
    }
});
