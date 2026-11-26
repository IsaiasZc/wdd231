import { places } from "../data/discover.mjs";

const cards = document.querySelector("#discover-cards");

places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = `images/discover/${place.image}`;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";
    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.setAttribute("aria-label", `Learn more about ${place.name}`);
    button.addEventListener("click", () => {
        const query = encodeURIComponent(`${place.name}, ${place.address}, Peru`);
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    });

    card.append(title, figure, address, description, button);
    cards.appendChild(card);
});

const visitMessage = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("discover-last-visit");
const days = Math.floor((now - Number(lastVisit)) / 86400000);

if (lastVisit === null) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else if (days < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
} else {
    visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

localStorage.setItem("discover-last-visit", now);
