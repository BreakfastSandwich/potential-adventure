
const userLocationBtn = document.getElementById('userLocation')
const stateSelectDDDiv = document.getElementById('stateDropDownDiv')
const userZipForm = document.getElementById('zipSearch')
const zipModalbtn = document.getElementById('zipSearchBtn')
const cityModalbtn = document.getElementById('cityModalbtn')
const citySearchInput = document.getElementById('citySearch')
const previousSearchList = document.getElementById('previousSearchList')
const weatherPrintEl = document.getElementById('weatherPrint')
const recallBtnEl = document.querySelectorAll('.recall')

// Main card print
const cityPrintEl = document.getElementById('cityPrint')
const currentDaySunrise = document.getElementById('sunrise')
const currentDaySunset = document.getElementById('sunset')
const currentDayImg = document.getElementById('currentDayImg')
const currentDayTemp = document.getElementById('currentTemp')
const currentFeelsLike = document.getElementById('currentFeelsLike')
const currentDayHumidity = document.getElementById('currentHumidity')
const currentDayWindSpeedEl = document.getElementById('currentDayWindSpeed')
const currentDayWindDirectionEl = document.getElementById('currentDayWindDirection')
const currentDayWeatherConditionEl = document.getElementById('currentDayWeatherCondition')

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
        buttonEl.setAttribute('class', 'btn recall btn-primary previousButton')
        buttonEl.setAttribute('latitude', lat)
        buttonEl.setAttribute('longitude', long)



        list.appendChild(buttonEl)
        previousSearchList.appendChild(list)
        


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
       
        
        console.log('taco')
        const userZipInput = document.getElementById('zipSearch').value

if (userZipInput.length == 5){

        var ZipRequest = `https://api.openweathermap.org/data/2.5/forecast?zip=${userZipInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

        console.log(userZipInput)



        fetch(ZipRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.cod == 200) {
                    searchResults(data)
                    printWeather(data)
                    } else if (data.cod == 404){
                        cityPrintEl.innerText = "The Zip Code you searched was not found. Please Try Again."
                    }
            })
            .catch(function (error) {
                console.log(error);
            });


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
            .catch(function (error) {
                console.log(error);
            });
        } else {
            cityPrintEl.innerText = "Please use a Zip Code that is 5 digits in length."
        }
    })



// Search by User's current location function

userLocationBtn.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition((data) => { weatherByCurrentLocation(data) })
})




function weatherByCurrentLocation(data) {
    let userLat = data.coords.latitude
    let userLong = data.coords.longitude
    
    weatherByLatLong(userLat, userLong)

}

function recallSearch() {
    let recall = JSON.parse(localStorage.getItem('previousSearchArray')) 
    console.log(recall)
}


recallBtnEl.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', recallSearch)
    console.log('taco')
  })



function weatherByLatLong(Lat, Long) {


    var userLocationRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Long}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`





    fetch(userLocationRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.cod == 200) {
                searchResults(data)
                printWeather(data)
                } else if (data.cod == 404){
                    cityPrintEl.innerText = "The Location you are using could not be found. Please Try Again."
                }
            return
        })
        .catch(function (error) {
            console.log(error);
        });
    var CurrentLocationRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`


 



    fetch(CurrentLocationRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            printCurrentWeather(data)


        })
        .catch(function (error) {
            console.log(error);
        });
    return
}


// Search by City & State function.
// this will run with just city but will display first JSON package and may be incorrect city. State added for accuracy. 


cityModalbtn.addEventListener('click', function weatherByCity(e) {
    
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
            if (data.cod == 200) {
            searchResults(data)
            printWeather(data)
            } else if (data.cod == 404){
                cityPrintEl.innerText = "The City and State combination you searched was not found. Please Try Again."
            }

            return
        })
        .catch(function (error) {
            console.log(error);
        });

    var CurrentCityRequest = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput},${userStateInput}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`





    fetch(CurrentCityRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            printCurrentWeather(data)

            return
        })
        .catch(function (error) {
            console.log(error);
        });
})



function searchResults(data) {

    let cityName = data.city.name
    let cityLat = data.city.coord.lat
    let cityLong = data.city.coord.lon


    function CityConstruct(city, Lat, Long) {
        this.city = city
        this.lat = Lat
        this.long = Long

    }


    const citySearch = new CityConstruct(cityName, cityLat, cityLong)

    StoreSearch(citySearch)

}

let WindDirection;
function WindDegToDirection(wd) {
    switch (true) {
        case 0:
            WindDirection = "N";
            break;
        case 360:
            WindDirection = "N";
            break;
        case 90:
            WindDirection = "E";
            break;
        case 180:
            WindDirection = "S";
            break;
        case 270:
            WindDirection = "W";
            break;
        case (wd > 0 && wd < 90):
            WindDirection = "NE";
            break;
        case (wd > 90 && wd < 180):
            WindDirection = "SE";
            break;
        case (wd > 180 && wd < 270):
            WindDirection = "SW";
            break;
        case (wd > 270 && wd < 360):
            WindDirection = "NW";
            break;
        default:
            WindDirection = "N/A";
            break;
    }
}


function printWeather(data) {
    let city = data.city.name
    let sunrise = data.city.sunrise
    let sunset = data.city.sunset
    const timeZone = data.city.timezone
    let weatherArray = data.list
    console.log(weatherArray)

 
    for (let i = 0; i < weatherArray.length; i++) {
        let timeStamp = weatherArray[i].dt
        let tempMax = weatherArray[i].main.temp_max
        let tempMin = weatherArray[i].main.temp_min
        let weatherCondition = weatherArray[i].weather[0].description
        let weatherConditionIcon = weatherArray[i].weather[0].icon
        let windSpeed = weatherArray[i].wind.speed
        let windDirectionDeg = weatherArray[i].wind.deg
        let humidity = weatherArray[i].main.humidity

       
// this converts the UTC Timestamp the time/date and adjusts for time zone shifts
        let time = new Date((timeStamp +(timeZone+14400))*1000).toLocaleString()
        console.log(time)

       

        let WindDirection;
        function WindDegToDirection(wd) {
            switch (true) {
                case 0:
                    WindDirection = "N";
                    break;
                case 360:
                    WindDirection = "N";
                    break;
                case 90:
                    WindDirection = "E";
                    break;
                case 180:
                    WindDirection = "S";
                    break;
                case 270:
                    WindDirection = "W";
                    break;
                case (wd > 0 && wd < 90):
                    WindDirection = "NE";
                    break;
                case (wd > 90 && wd < 180):
                    WindDirection = "SE";
                    break;
                case (wd > 180 && wd < 270):
                    WindDirection = "SW";
                    break;
                case (wd > 270 && wd < 360):
                    WindDirection = "NW";
                    break;
                default:
                    WindDirection = "N/A";
                    break;
            }
    
            return WindDirection;
        }

        

        WindDegToDirection(windDirectionDeg)

        const Print = document.createElement('div')

        Print.innerHTML =
            `<div class="daysWeather">
          
            <div> <p>${time}</p></div> 

                 <div><img src="./assets/images/${weatherConditionIcon}.png" alt="  ${weatherCondition}" / class="img"><p>${weatherCondition}</p></div>
                <div class="card-body"
                
                        
                        <p>Temp High: ${tempMax}</p>
                        <p>Temp Low: ${tempMin}</p>
                        <p>Humidity: ${humidity}</p>
                    </div>
            

                <div class="card-body">
                    <p>Wind Speed: ${windSpeed}</p>
                    <p>Wind Direction: ${WindDirection}</p>
                    
                    
                </div>
                
            </div>`

        weatherPrintEl.appendChild(Print)




        console.log(timeStamp)
        console.log(tempMax)
        console.log(tempMin)
        console.log(weatherCondition)
        console.log(weatherConditionIcon)
        console.log(windSpeed)

    
    }
 







}

function printCurrentWeather(data) {
    let city = data.name
    let sunriseUTC = data.sys.sunrise
    let sunsetUTC = data.sys.sunset
    let timeZone = data.timezone
    let tempTrue = data.main.temp
    let tempFeelsLike = data.main.feels_like
    let humidity = data.main.humidity
    let windSpeed = data.wind.speed
    let windDeg = data.wind.deg
    let weatherCondition = data.weather[0].description
    let weatherIconCode = data.weather[0].id
    let weatherIconCodeNum = data.weather[0].icon
    let WindDirection;

    function currentWindDegToDirection(wd) {
        switch (true) {
            case 0:
                WindDirection = "N";
                break;
            case 360:
                WindDirection = "N";
                break;
            case 90:
                WindDirection = "E";
                break;
            case 180:
                WindDirection = "S";
                break;
            case 270:
                WindDirection = "W";
                break;
            case (wd > 0 && wd < 90):
                WindDirection = "NE";
                break;
            case (wd > 90 && wd < 180):
                WindDirection = "SE";
                break;
            case (wd > 180 && wd < 270):
                WindDirection = "SW";
                break;
            case (wd > 270 && wd < 360):
                WindDirection = "NW";
                break;
            default:
                WindDirection = "N/A";
                break;
        }

        return WindDirection;
    }

    let sunrise = new Date((sunriseUTC + (timeZone + 14400))*1000).toLocaleString()
    let sunset = new Date((sunsetUTC+ (timeZone + 14400))*1000).toLocaleString()

   


    currentWindDegToDirection(windDeg)




    cityPrintEl.innerText = city
    currentDaySunrise.innerText = `Sunrise: ${sunrise}`
    currentDaySunset.innerText = `Sunset: ${sunset}`
    currentDayImg.innerHTML = `<img src="./assets/images/${weatherIconCodeNum}.png" alt="${weatherCondition}" class="img"><p>${weatherCondition}</p></img>`
    currentDayTemp.innerText = `Current Temp: ${tempTrue}`
    currentFeelsLike.innerText = `Currently Feels Like: ${tempFeelsLike}`
    currentDayHumidity.innerText = `Current Humidity: ${humidity}`
    currentDayWindSpeedEl.innerText = `Current Wind Speed: ${windSpeed}`
    currentDayWindDirectionEl.innerText = `Current Wind Direction: ${WindDirection}`
    currentDayWeatherConditionEl.innerText = `Current Weather Condition: ${weatherCondition}`




    console.log(city)
    console.log(sunrise)
    console.log(sunset)
    console.log(weatherCondition)
    console.log(WindDirection)
    console.log(weatherIconCode)
    console.log(weatherIconCodeNum)
}










RetreivePrevious()
