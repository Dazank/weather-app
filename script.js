const citySearchInput = document.querySelector('.city_search_input')
const citySearchForm = document.querySelector('.city_search_form')
const country = document.querySelector('.country')
const city = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather_icon')
const weatherText = document.querySelector('.weather_text')
const temperature = document.querySelector('.temperature')
const temperatureUnit = document.querySelector('.temperature_unit')
const date = document.querySelector('.date')
const time = document.querySelector('.time')
const timeDisplay = document.querySelector('.time_display')

const citySearchURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const APIKey = 'ZBNRGeGPoVhZ7zIn0lwIpQ9O04nY7WtO';

const citySearchRequest = async (city) =>{
let citySearchResponse = await fetch(`${citySearchURL}` + `?apikey=${APIKey}` + `&q=${city}`)
let citySearchData = await citySearchResponse.json()
return citySearchData

}

const currentConditionsURL = 'http://dataservice.accuweather.com/currentconditions/v1/'
const cityConditionsRequest = async (cityKey)=>{
let cityConditions = await fetch(currentConditionsURL + cityKey + `?apikey=${APIKey}` + '&details=true'  )
let conditionData = await cityConditions.json()
return conditionData



}


citySearchForm.addEventListener('submit', (e)=>{

   e.preventDefault();
   e.stopPropagation();
   citySearchRequest(citySearchInput.value.trim()).then((citySearchData)=>{
  const cityData = citySearchData[0]
  return cityData

}).then((cityData)=>{
   const countryName = cityData.Country.LocalizedName
   const cityName = cityData.LocalizedName
   const cityKey = cityData.Key
   country.innerText = countryName 
   city.innerText = `${cityName}, `

   console.log(cityData)
return cityKey
}).then((cityKey)=>{
   return cityConditionsRequest(cityKey)
   

}).then((data)=>{
console.log(data[0].WeatherIcon)
const isDay = data[0].IsDayTime
const weatherIconNumber = data[0].WeatherIcon
const weatherStatus = data[0].WeatherText
const temperatureValue = data[0].Temperature.Metric.Value
const temperatureScale = data[0].Temperature.Metric.Unit
const dateTime = data[0].LocalObservationDateTime
const year = dateTime.substr(0, 4)
const month = dateTime.substr(5, 2)
const day = dateTime.substr(8,2)
const currentTime = dateTime.substr(11,5)

if(temperatureValue != null){
   temperature.innerText = temperatureValue
   temperatureUnit.innerText = temperatureScale

}

 weatherIcon.style.backgroundImage = `url(icons/${weatherIconNumber}.svg)`
weatherText.innerText = weatherStatus
time.innerText = currentTime
date.innerText = `${day}  ${month}  ${year}`
isDay ? timeDisplay.style.backgroundImage = `url(./images/day.jpg)` 
: timeDisplay.style.backgroundImage = `url(./images/night.jpg)`

timeDisplay.classList.remove('hidden')
})

})



