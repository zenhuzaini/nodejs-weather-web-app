// console.log('app.js is loaded :D')

//fetch forecast infromation
//make http request from the client side
//we will use Fetch API, which is from the browser API

//HTTP Browser HTTP Requests With Fetch

//fetch is a function for client side js
//parse from url and load it into front end
fetch('http://puzzle.mead.io/puzzle').then((response) => { //then to get the return value of fetch
    response.json().then((infromasi) => {//the function will be ran if they got the json and *then parse
        console.log(infromasi)
    })
})

//get the url from our API
const url = 'http://localhost:1996/weather?address=jakarta'
fetch(url).then((response) => {
    //get the response using json method
    response.json().then((information) => {
        if (information.error) {
            console.log(information.error)
        } else {
            console.log(information.weather.location)
            console.log(information.weather.currentSummary)
            console.log(information.weather.currentTemperature)
        }
    })
})

fetch('http://localhost:1996/weather?address=Swidnica').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})

const fungsi = (param) => {
    fetch(`http://localhost:1996/weather?address=${param}`).then((the_response) => {
        the_response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
            }
        })
    })
}

fungsi('barbar')

// -----------
//STUDY PURPOSES
//select the document tag/ selector
const weatherForm = document.querySelector('form')

//select the button to get the input
const search = document.querySelector('input')


const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = `It's from Javascript`

//get other weather
const theWeather = (GetAddress) => {
    messageOne.textContent = '..loading..'
    messageTwo.textContent = ''

    //select the p (messageID) in order to be a place to put the iformtion
    fetch(`http://localhost:1996/weather?address=${GetAddress}`).then((response) => {
        response.json().then((theNewInformation) => {
            if (theNewInformation.error) {
                console.log(theNewInformation.error)
                messageOne.textContent = JSON.stringify(theNewInformation.error)
            } else {
                console.log(theNewInformation)
                messageOne.textContent = theNewInformation.location
                messageTwo.textContent = `The temperature today in ${theNewInformation.location} is ${theNewInformation.weather.currentSummary} / (${theNewInformation.weather.currentTemperature})`
            }
        })
    })

}

//add event listener
weatherForm.addEventListener('submit', (e) => { //e : event object
    e.preventDefault(); //we told the browser to stop loading because we will handle it

    const location = search.value
    theWeather(location)
})

//END FOR STUDY

