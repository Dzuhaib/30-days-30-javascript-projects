const apiKey = "f606f58215b9bd1210eafffb7241afb2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        const data = await response.json();
        updateUI(data);
    }
}


async function checkWeatherByLocation(lat, lon) {
    const response = await fetch(`${geoApiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);

    if (response.ok) {
        const data = await response.json();
        updateUI(data);
    } else {
        console.error("Failed to fetch weather for current location.");
    }
}


function updateUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
        document.body.style.backgroundImage = 'url("images/cloudy-background.jpg")';
    } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'images/clear.png';
        document.body.style.backgroundImage = 'url("images/clear-background.jpg")';
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'images/rain.png';
        document.body.style.backgroundImage = 'url("images/rain-background.jpg")';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
        document.body.style.backgroundImage = 'url("images/drizzle-background.jpg")';
    } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'images/mist.png';
        document.body.style.backgroundImage = 'url("images/mist-background.jpg")';
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
}


function getLocationAndFetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                checkWeatherByLocation(lat, lon);
            },
            (error) => {
                console.error("Error getting location:", error);
               
                checkWeather("Karachi");
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        document.
        checkWeather("Karachi");
    }
}


searchbtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});


getLocationAndFetchWeather();
