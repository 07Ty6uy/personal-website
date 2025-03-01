async function fetchWeather() {
    const apiKey = 'b57b2a2ca51a41b12b77b0d4781281dd';

    const cityInp = document.getElementById('cityInput').value;
    if (cityInp) {
        url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${cityInp}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Could not fetch weather data');
        }
        const data = await response.json();
        const weather = data.current;

        const temp = weather.temperature;
        const feelsLike = weather.feelslike;
        const state = data.location.region;
        const country = data.location.country;
        const desc = weather.weather_descriptions[0];
        const icon = weather.weather_icons[0];

        const cityText = document.getElementById('city');
        const tempText = document.getElementById('temp');
        const feelsLikeText = document.getElementById('feelsLike');
        const descriptionText = document.getElementById('descriptions');
        const imgElement = document.getElementById('icon');

        cityText.textContent = `${cityInp}  ${state}, ${country}`;
        tempText.textContent = `Temp: ${temp}°C (${toFerh(temp)}°F)`;
        feelsLikeText.textContent = `Feels like: ${feelsLike}°C (${toFerh(feelsLike)}°F)`;
        descriptionText.textContent = `Description: ${desc}`;
        imgElement.src = icon;
        imgElement.style.display = 'block';
        imgElement.style.marginLeft = 10 + 'px';

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

function toFerh(temp) {
    return (temp * 9/5) + 32;
}