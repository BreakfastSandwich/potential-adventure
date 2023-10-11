
const userLocationBtn = document.getElementById('userLocation')
const stateSelectDDDiv = document.getElementById('stateDropDownDiv')
const userZipForm = document.getElementById('zipSearch')



userZipForm.addEventListener('submit', function weatherByZip(e) {
    e.preventDefault()

    const userZipInput = document.getElementById('zipCode').value
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


userLocationBtn.addEventListener ('click', function () {
navigator.geolocation.getCurrentPosition((data)=>{weatherByCurrentLocation(data)})
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




