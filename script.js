const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const city = document.getElementById("city")
const regionOrigin = document.getElementById("region-origin")
const countryOrigin = document.getElementById("country-origin")
const time = document.getElementById("time-now")
const temperature = document.getElementById("temperature-celsius")
const cloudCover = document.getElementById("cloud-cover")
const windSpeed = document.getElementById("wind-kilometer")
const windDirection = document.getElementById("wind-direction")
const precipitation = document.getElementById("rain-in-mm")
const weatherHumidity = document.getElementById("weather-humidity")
const weatherHeatIndex = document.getElementById("heat-index-celsius")
const weatherIcon = document.getElementById("weather-icon")

const forecastText = document.getElementById("forecast-text")
const forecastOneSky = document.getElementById("forecast-first-sky")
const forecastOneRain = document.getElementById("forecast-first-rain")
const forecastOneIcon = document.getElementById("forecast-first-icon")

const forecastTwoSky = document.getElementById("forecast-second-sky")
const forecastTwoRain = document.getElementById("forecast-second-rain")
const forecastTwoIcon = document.getElementById("forecast-second-icon")

const forecastThreeSky = document.getElementById("forecast-third-sky")
const forecastThreeRain = document.getElementById("forecast-third-rain")
const forecastThreeIcon = document.getElementById("forecast-third-icon")

const forecastFourSky = document.getElementById("forecast-fourth-sky")
const forecastFourRain = document.getElementById("forecast-fourth-rain")
const forecastFourIcon = document.getElementById("forecast-fourth-icon")


const fetchWeatherData = async () => {
  try {
    const citySearch = searchInput.value.toLowerCase()
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=cbc96f70ae97419c9ff74213242608&q=${citySearch}&aqi=no`);
    const data = await res.json();
    weatherInfo(data)
  } catch (err) {
    alert("City not found")
    console.log(err);
  }
};

const fetchWeatherForecast = async () => {
  try {
    const citySearch = searchInput.value.toLowerCase()
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cbc96f70ae97419c9ff74213242608&q=${citySearch}&days=3&aqi=no&alerts=yes`);
    const data = await res.json();
    weatherForecast(data)
  } catch (err) {
    alert("City not found")
    console.log(err);
  }
};

const weatherInfo = data => {
  const {location, current} = data

weatherIcon.innerHTML = `<img src="${current.condition.icon}">`
city.textContent = `${location.name}`
regionOrigin.textContent = `${location.region}`
countryOrigin.textContent = `${location.country}`
time.textContent = `${location.localtime}`
temperature.textContent = `Temperature: ${current.temp_c}°C`
cloudCover.textContent = `${current.condition.text}`
windSpeed.textContent = `Wind speed: ${current.wind_kph} kph`
windDirection.textContent = `Wind direction: ${current.wind_dir}`
precipitation.textContent = `Precipitaion: ${current.precip_mm} mm`
weatherHumidity.textContent = `Humidity: ${current.humidity}%`
weatherHeatIndex.textContent = `Heat index: ${current.heatindex_c}°C`
}

const weatherForecast = data => {
  const {current, forecast} = data

forecastText.textContent = `Weather Forecast`

forecastOneIcon.innerHTML = `<img src="${forecast.forecastday[0].hour[6].condition.icon}">`
forecastOneSky.textContent = `6AM ${forecast.forecastday[0].hour[6].condition.text}`
forecastOneRain.textContent = `Chance of rain: ${forecast.forecastday[0].hour[6].chance_of_rain}%`

forecastTwoIcon.innerHTML = `<img src="${forecast.forecastday[0].hour[12].condition.icon}">`
forecastTwoSky.textContent = `12PM ${forecast.forecastday[0].hour[12].condition.text}`
forecastTwoRain.textContent = `Chance of rain: ${forecast.forecastday[0].hour[12].chance_of_rain}%`

forecastThreeIcon.innerHTML = `<img src="${forecast.forecastday[0].hour[18].condition.icon}">`
forecastThreeSky.textContent = `6PM ${forecast.forecastday[0].hour[18].condition.text}`
forecastThreeRain.textContent = `Chance of rain: ${forecast.forecastday[0].hour[18].chance_of_rain}%`

forecastFourIcon.innerHTML = `<img src="${forecast.forecastday[1].hour[0].condition.icon}">`
forecastFourSky.textContent = `12AM ${forecast.forecastday[1].hour[0].condition.text}`
forecastFourRain.textContent = `Chance of rain: ${forecast.forecastday[1].hour[0].chance_of_rain}%`

}

searchButton.addEventListener("click", e => {
  e.preventDefault()
  fetchWeatherData()
  fetchWeatherForecast()
})

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter"){
    searchButton.click()
  }
})