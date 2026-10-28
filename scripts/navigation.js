const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navBar.classList.toggle('show', isOpen);
});

document.querySelector('#last-modified').textContent = new Date(document.lastModified).toLocaleString();
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
