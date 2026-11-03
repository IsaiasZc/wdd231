const requestURL = './data/members.json';
const cards = document.querySelector('.directory-cards');
const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');

async function getBusinessData() {
    const response = await fetch(requestURL);
    const business = await response.json();
    business.forEach(displayBusiness);
}

function displayBusiness(business) {
    const card = document.createElement('section');
    const name = document.createElement('h2');
    const portrait = document.createElement('img');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const web = document.createElement('p');
    const link = document.createElement('a');

    name.textContent = business.businessName;
    portrait.setAttribute('src', `images/${business.logo}`);
    portrait.setAttribute('alt', `${business.businessName} identifier`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '240');
    portrait.setAttribute('height', '100');
    address.textContent = business.address;
    phone.textContent = business.phone;
    link.setAttribute('href', business.website);
    link.textContent = business.website;
    web.appendChild(link);
    card.classList.add('views', 'grid-display');
    card.appendChild(portrait);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(web);
    cards.appendChild(card);
}

function changeView(view) {
    const isGrid = view === 'grid';
    cards.classList.toggle('directory-grid-container', isGrid);
    cards.classList.toggle('directory-list-container', !isGrid);
    document.querySelectorAll('.views').forEach(element => {
        element.classList.toggle('grid-display', isGrid);
        element.classList.toggle('list-display', !isGrid);
    });
    gridViewButton.setAttribute('aria-pressed', isGrid);
    listViewButton.setAttribute('aria-pressed', !isGrid);
}

gridViewButton.addEventListener('click', () => changeView('grid'));
listViewButton.addEventListener('click', () => changeView('list'));
getBusinessData();
