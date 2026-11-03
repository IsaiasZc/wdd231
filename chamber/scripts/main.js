// Responsive navigation
const button = document.querySelector('#hambButton');
const firstNav = document.querySelector('.firstNav');

button.onclick = () => {
    firstNav.classList.toggle('open');
    button.classList.toggle('open');
    button.setAttribute('aria-expanded', firstNav.classList.contains('open'));
};

// Current year and last modification
const date = new Date();
document.querySelector('#home-year').textContent = date.getFullYear();
document.getElementById('lastTime').textContent = document.lastModified;
