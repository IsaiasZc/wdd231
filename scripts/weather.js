const temperature = document.querySelector('#current-temp');
const icon = document.querySelector('#weather-icon');
const figure = document.querySelector('figure');
const caption = document.querySelector('figcaption');
const status = document.querySelector('#weather-status');

async function apiFetch(key) {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.search = new URLSearchParams({ lat: '49.75', lon: '6.64', units: 'metric', appid: key });
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayResults(data);
        status.textContent = '';
    } catch (error) {
        console.error('Unable to load weather:', error);
        status.textContent = 'Unable to load weather. Check your key and try again.';
        figure.hidden = true;
        temperature.textContent = 'not available';
    }
}

function displayResults(data) {
    const weather = data.weather[0];
    temperature.textContent = `${data.main.temp} °C`;
    icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    icon.alt = weather.description;
    caption.textContent = weather.description;
    figure.hidden = false;
}

document.querySelector('#load-weather').addEventListener('click', () => {
    const key = document.querySelector('#api-key').value.trim();
    if (key) apiFetch(key);
    else status.textContent = 'Enter your OpenWeatherMap API key.';
});
