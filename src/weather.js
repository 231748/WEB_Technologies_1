const API_KEY = '2ec17ea050c446438f852946241211'; // Replace with your WeatherAPI key

async function fetchWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-info').textContent = `Failed to load weather data. ${error.message}`;
        console.error('Fetch error:', error);
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const weatherInfo = `
        <h4>${location.name}, ${location.region}, ${location.country}</h4>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Wind: ${current.wind_kph} kph</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

document.getElementById('weather-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        document.getElementById('weather-info').textContent = 'Please enter a valid city name.';
    }
});