
const userLocationBtn = document.getElementById('userLocation')
const stateSelectDDDiv = document.getElementById('stateDropDownDiv')
const userZipForm = document.getElementById('zipSearch')
const zipModalbtn = document.getElementById('zipSearchBtn')
const cityModalbtn = document.getElementById('cityModalbtn')
const citySearchInput = document.getElementById('citySearch')
const previousSearchList = document.getElementById('previousSearchList')



function RetreivePrevious() {

    const previousSearchArray = JSON.parse(localStorage.getItem('previousSearchArray')) || []
    console.log(previousSearchArray)

    for (let i = 0; i<previousSearchArray.length; i++) {
        const previousSearch = previousSearchArray[i]

        const buttonEl = document.createElement('button')
        const buttonElLabel = document.createTextNode(`${location}`)
        buttonEl.appendChild(buttonElLabel)
        previousSearchList.appendChild(buttonEl)


    }
}

function StoreSearch() {
    const previousSearchArray = JSON.parse(localStorage.getItem('previousSearchArray')) || []
    console.log(previousSearchArray)
    

}


// Search by Zip function

zipModalbtn.addEventListener('click', function weatherByZip(e) {
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




    var userLocationRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLong}&appid=608f5d7e99b3bee2a797c9ab316ee2c6&units=imperial`

    console.log(data)



    fetch(userLocationRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);






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

            return
        })
})








