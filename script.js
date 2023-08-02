// Get references to DOM elements
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const locationElement = document.querySelector('.location h2');
const tempElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.condition');

// Replace with your OpenWeatherMap API key
const apiKey = 'c03416c3e4d4842277448d96c6543ce7';

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      
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
  