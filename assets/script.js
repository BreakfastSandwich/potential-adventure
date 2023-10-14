
const userLocationBtn = document.getElementById('userLocation')
const stateSelectDDDiv = document.getElementById('stateDropDownDiv')
const userZipForm = document.getElementById('zipSearch')
const zipModalbtn = document.getElementById('zipSearchBtn')
const cityModalbtn = document.getElementById('cityModalbtn')
const citySearchInput = document.getElementById('citySearch')
const previousSearchList = document.getElementById('previousSearchList')

// Main card print
const cityPrintEl = document.getElementById('cityPrint')
const currentDaySunrise = document.getElementById('sunrise')
const currentDaySunset = document.getElementById('sunset')
const currentDayImg = document.getElementById('currentDayImg')
const currentDayTemp = document.getElementById('currentTemp')
const currentFeelsLike = document.getElementById('currentFeelsLike')
const currentDayHumidity = document.getElementById('currentHumidity')


function RetreivePrevious() {

    // previousSearchList.removeChild('li')

    const previousSearchArray = JSON.parse(localStorage.getItem('previousSearchArray')) || []
    console.log(previousSearchArray)

    for (let i = 0; i < previousSearchArray.length && i < 5; i++) {
        const city = previousSearchArray[i].city
        const lat = previousSearchArray[i].lat
        const long = previousSearchArray[i].long



        const list = document.createElement('li')
        const buttonEl = document.createElement('button')
        buttonEl.innerText = city
        buttonEl.setAttribute('class', 'btn btn-primary previousButton')
        buttonEl.setAttribute('latitude', lat)
        buttonEl.setAttribute('longitude', long)



        list.appendChild(buttonEl)
        previousSearchList.appendChild(list)
        // previousSearchList.appendChild(list)


    }
}

function StoreSearch(city) {
    const previousSearchArray = JSON.parse(localStorage.getItem('previousSearchArray')) || []
    previousSearchArray.unshift(city)
    if (previousSearchArray.length >= 6) {
        previousSearchArray.pop()
    }
    localStorage.setItem("previousSearchArray", JSON.stringify(previousSearchArray))
    console.log(previousSearchArray)
   

}



// Search by Zip function

zipModalbtn.addEventListener('click',
    function weatherByZip() {
        // e.preventDefault()
        console.log('taco')
        const userZipInput = document.getElementById('zipSearch').value

        var ZipRequest = `https://api.openweathermap.org/data/2.5/forecast?zip=${userZipInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

        console.log(userZipInput)



        fetch(ZipRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                searchResults(data)
                printWeather(data)

                return
            })


            var CurrentZipRequest = `https://api.openweathermap.org/data/2.5/weather?zip=${userZipInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

            console.log(userZipInput)
    
    
    
            fetch(CurrentZipRequest)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    printCurrentWeather(data)
    
                    return
                })
    })



// Search by User's current location function

userLocationBtn.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition((data) => { weatherByCurrentLocation(data) })
})




function weatherByCurrentLocation(data) {
    let userLat = data.coords.latitude
    let userLong = data.coords.longitude
    console.log(userLat)
    console.log(userLong)
    weatherByLatLong(userLat, userLong)
   
}



function weatherByLatLong(Lat, Long) {


    var userLocationRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Long}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

    // console.log(data)



    fetch(userLocationRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            searchResults(data)
            printWeather(data)
            return
        })

        var CurrentLocationRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`
       

        console.log(CurrentLocationRequest)



        fetch(CurrentLocationRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                printCurrentWeather(data)

                return
            })
}


// Search by City & State function.
// this will run with just city but will display first JSON package and may be incorrect city. State added for accuracy. 


cityModalbtn.addEventListener('click', function weatherByCity(e) {
    // e.preventDefault()
    console.log('taco')
    const userCityInput = document.getElementById('citySearch').value
    const stateInput = document.getElementById('stateSelect').value
    const userStateInput = stateInput.toLowerCase()


    var CityRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput},${userStateInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

    console.log(userCityInput)
    console.log(userStateInput)


    fetch(CityRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            searchResults(data)
            printWeather(data)

            return
        })

        var CurrentCityRequest = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput},${userStateInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`
       

        console.log(CurrentCityRequest)



        fetch(CurrentCityRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                printCurrentWeather(data)

                return
            })
})



function searchResults(data) {

    let cityName = data.city.name
    let cityLat = data.city.coord.lat
    let cityLong = data.city.coord.lon

    console.log(cityName)
    console.log(cityLat)
    console.log(cityLong)




    function CityConstruct(city, Lat, Long) {
        this.city = city
        this.lat = Lat
        this.long = Long

    }


    const citySearch = new CityConstruct(cityName, cityLat, cityLong)

    StoreSearch(citySearch)
    
}


function printWeather(data) {
    let city = data.city.name
    let sunrise = data.city.sunrise
    let sunset = data.city.sunset
    let timeZone = data.city.timezone
 



    console.log(city)
    console.log(sunrise)
    console.log(sunset)
    console.log(timeZone)







}

function printCurrentWeather(data) {
    let city = data.name
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset
    let timeZone = data.timezone
    let tempTrue = data.main.temp
    let tempFeelsLike = data.main.feels_like
    let humidity = data.main.humidity
    let windSpeed = data.wind.speed
    let windDirect = data.wind.deg
    let weatherCondition = data.weather[0].description
    let weatherIcon = data.weather[0].Icon
    // let sunSet = sunset.toTimeString()

    cityPrintEl.innerText = city
    currentDaySunrise.innerText = `Sunrise: ${sunrise}`
    currentDaySunset.innerText = `Sunset: ${sunset}`
    currentDayImg 
    currentDayTemp.innerText = `Current Temp: ${tempTrue}`
    currentFeelsLike.innerText = `Currently Feels Like: ${tempFeelsLike}`
    currentDayHumidity.innerText = `Current Humidity: ${humidity}`

    console.log(city)
    console.log(sunrise)
    console.log(sunset)
    console.log(weatherCondition)

}










RetreivePrevious()