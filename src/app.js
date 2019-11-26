const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const port = process.env.PORT || 1996

//from utils
const geocode = require('../src/utils/geocode')
const weather = require('../src/utils/weather')

// console.log(__dirname)
// console.log(__filename)
//path has a method that is used to locate the static folder / public folder
// because as we have seen in the __dirname, it will have a value that returns our folder locaion

//generate path to the public folder and put it in exprss static and express will configure it for us
const publicLocation = path.join(__dirname, '../public') // it will join the existing path to our path destination (public) . we can use like ../.../ if there are more folders
app.use(express.static(publicLocation)) //set the express static,

const setViewPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', setViewPath)

//in order to run hbs when using nodemon 
//write nodemon src/app.js -e js,hbs 

const setPartials = path.join(__dirname, '../templates/partials')
hbs.registerPartials(setPartials)

app.get('/', (req, res) => {
    res.render('homepage', {
        title: 'HomePage',
        name: 'zen Huzaini'
    }) //to check whether the file exist or not, we can use localhost:3000/index.html
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zen Huzaini'
    })
})

app.get('/help', (req, res) => {
    // res.send([{
    //     name: 'zen',
    //     age: 13
    // },
    // {
    //     name: 'huzaini',
    //     age: 23
    // }])

    res.render('help', { title: 'Help', name: 'Zen Huzaini' })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ //harus di return karena agar kode di bawahnya tidak di eksekusi.
            error: 'please provide your search query'
        })
    }
    //to get query string, is from req
    // console.log(req.query)
    //console.log(req.query.serach)// search is pecific query
    res.send({
        products: []
    })
})

app.get('/checkWeather', (req, res) => {
    res.render('weather', { title: 'Check Weather' })
})

//the middleware
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'address term must be provided :)'
        })
    }

    //I set the default value if there is no input
    geocode.geocode(address, (errGeocode, { longitude, latitude, location } = {}) => { //this approach called to set default parameter for obj destructuring. We acan also use one random param ex="dataGeocode" that will return the same value
        if (errGeocode) {
            return res.send({
                error: errGeocode
            })
        }

        weather.weather(longitude, latitude, (errWeather, dataWeather) => {
            if (errWeather) {
                return res.send({
                    error: errWeather
                })
            }

            return res.send({
                inputQuery: address,
                location: location,
                weather: dataWeather
            })
        })


    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: `the article doesn't doesn't exist - 404`
    })
})

app.get('*', (req, res) => { //* it means that can be match to everything / every endpoints
    res.render('404', {
        errMessage: `the endpoint doesn't work - 404`
    })
})

app.listen(port, () => {
    console.log('this app listen to port ' + port)
})