const weather = {
  API_KEY: 'YOUR_API_KEY_GOES_HERE',
  fetchWeather: async function (city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.API_KEY}`
      )
      if (!response.ok) {
        const message = `An Error Occured: ${response.status}`
        alert('An error occured: No weather found!')
        throw new Error(message)
      }
      const data = await response.json()
      this.displayWeather(data)
    } catch (error) {
      console.error(error)
    }
  },
  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
    document.querySelector('.city').innerHTML = `Weather in ${name}`
    document.querySelector(
      '.icon'
    ).src = `http://openweathermap.org/img/wn/${icon}.png`
    document.querySelector('.temp').innerHTML = `${temp}°C`
    document.querySelector('.description').innerHTML = description
    document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`
    document.querySelector('.wind').innerHTML = `Wind speed: ${speed} km/h`
    document.querySelector('.weather').classList.remove('loading')
    document.body.style.backgroundImage = `url(./assets/img/${icon}.webp)`
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value)
  },
}

document
  .querySelector('.search button')
  .addEventListener('click', () => weather.search())

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
  if (e.key == 'Enter') weather.search()
})

weather.fetchWeather('Jakarta')
