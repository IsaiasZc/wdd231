const weatherApiKey = "31b886c84c9c9db98eeba6960d675bee";

async function loadWeather() {
    const temperature = document.querySelector("#temperature");
    const description = document.querySelector("#weather-description");
    const icon = document.querySelector("#weather-icon");
    const forecastList = document.querySelector("#forecast-list");
    const status = document.querySelector("#weather-status");

    try {
        const currentURL = new URL("https://api.openweathermap.org/data/2.5/weather");
        currentURL.search = new URLSearchParams({ q: "Lima", units: "imperial", appid: weatherApiKey });
        const currentResponse = await fetch(currentURL);
        if (!currentResponse.ok) throw new Error("Current weather request failed");
        const currentWeather = await currentResponse.json();

        temperature.textContent = `${Math.round(currentWeather.main.temp)}°F`;
        description.textContent = currentWeather.weather[0].description;
        icon.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
        icon.alt = currentWeather.weather[0].description;

        const forecastURL = new URL("https://api.openweathermap.org/data/2.5/forecast");
        forecastURL.search = new URLSearchParams({
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon,
            units: "imperial",
            appid: weatherApiKey,
        });
        const forecastResponse = await fetch(forecastURL);
        if (!forecastResponse.ok) throw new Error("Forecast request failed");
        const forecast = await forecastResponse.json();
        displayForecast(forecast, forecastList);
        if (status) status.textContent = "";
    } catch {
        description.textContent = "Weather is temporarily unavailable.";
        if (forecastList) forecastList.textContent = "Forecast is temporarily unavailable.";
        if (status) status.textContent = "Please try again later.";
    }
}

function displayForecast(forecast, forecastList) {
    const timezoneOffset = forecast.city.timezone || 0;
    const today = new Date(Date.now() + timezoneOffset * 1000);
    const todayKey = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}-${String(today.getUTCDate()).padStart(2, "0")}`;
    const dailyTemperatures = new Map();

    forecast.list.forEach((period) => {
        const localDate = new Date((period.dt + timezoneOffset) * 1000);
        const dateKey = `${localDate.getUTCFullYear()}-${String(localDate.getUTCMonth() + 1).padStart(2, "0")}-${String(localDate.getUTCDate()).padStart(2, "0")}`;
        if (dateKey <= todayKey) return;

        const temperatures = dailyTemperatures.get(dateKey) || [];
        temperatures.push(period.main.temp);
        dailyTemperatures.set(dateKey, temperatures);
    });

    forecastList.replaceChildren();
    [...dailyTemperatures.entries()].slice(0, 3).forEach(([dateKey, temperatures]) => {
        const item = document.createElement("li");
        const dateLabel = document.createElement("strong");
        const temperatureRange = document.createElement("span");
        const date = new Date(`${dateKey}T12:00:00Z`);

        dateLabel.textContent = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        }).format(date);
        temperatureRange.textContent = `${Math.round(Math.min(...temperatures))}°F – ${Math.round(Math.max(...temperatures))}°F`;
        item.append(dateLabel, temperatureRange);
        forecastList.append(item);
    });
}

async function loadSpotlights() {
    const spots = document.querySelectorAll(".spots");
    const status = document.querySelector("#spotlight-status");

    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Member data request failed");
        const members = await response.json();
        const eligibleMembers = members.filter((member) => member.membership === 2 || member.membership === 3);

        for (let index = eligibleMembers.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [eligibleMembers[index], eligibleMembers[randomIndex]] = [eligibleMembers[randomIndex], eligibleMembers[index]];
        }

        spots.forEach((spot, index) => {
            const member = eligibleMembers[index];
            if (!member) return;
            displaySpotlight(member, spot);
        });
        if (status) status.textContent = "";
    } catch {
        spots.forEach((spot) => {
            spot.textContent = "Member spotlights are temporarily unavailable.";
        });
        if (status) status.textContent = "Please try again later.";
    }
}

function displaySpotlight(member, spot) {
    const details = document.createElement("div");
    const name = document.createElement("h3");
    const logo = document.createElement("img");
    const phone = document.createElement("p");
    const address = document.createElement("p");
    const website = document.createElement("a");
    const membership = document.createElement("p");
    const level = member.membership === 3 ? "Gold" : "Silver";

    name.textContent = member.businessName;
    logo.src = `images/${member.logo}`;
    logo.alt = `${member.businessName} logo`;
    logo.loading = "lazy";
    phone.textContent = member.phone;
    address.textContent = member.address;
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.className = "spotlight-website";
    website.textContent = member.website;
    membership.className = "spotlight-membership";
    membership.textContent = `${level} member`;

    details.append(name, logo, phone, address, website, membership);
    spot.setAttribute("aria-label", `${member.businessName}, ${level} member`);
    spot.replaceChildren(details);
}

loadWeather();
loadSpotlights();
