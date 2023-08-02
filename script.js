// Get references to DOM elements
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const locationElement = document.querySelector('.location h2');
const tempElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.condition');

// Your OpenWeatherMap API key
const apiKey = '0fc077cd6cf3989d0a8c2146560e82cb';

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
  if (data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    conditionElement.textContent = data.weather[0].main;

    // Apply a class based on the weather condition
    document.body.className = `weather-${data.weather[0].main.toLowerCase()}`;
  } else {
    locationElement.textContent = 'City not found';
    tempElement.textContent = '';
    conditionElement.textContent = '';
    document.body.className = ''; // Reset class if no weather data
  }
}

// Event listener for the search button
searchButton.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (city) {
    const weatherData = await getWeather(city);

    if (weatherData) {
      updateWeatherUI(weatherData);
    } else {
      updateWeatherUI(null);
    }
  }
});

// Initial UI update (optional)
updateWeatherUI(null);
