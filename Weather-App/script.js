document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const api_key = "76c9be298e7782115f47fde30639659a";

    getWeatherButton.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) alert("You have to enter a city!");

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("City not found!");
        }
        
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = `City : ${name}`;
        temperatureDisplay.textContent = `Temperature : ${main.temp}°C`;
        descriptionDisplay.textContent = `Description : ${weather[0].description}`;
        
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});
