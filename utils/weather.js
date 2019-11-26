const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8593f986c0f88727f3270a097ee4b90c/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('check your inet connection', undefined)
        } else if (body.error) {
            callback('check your latitude / longitude', undefined)
        } else {
            const data = {
                latitude: body.latitude,
                longitude: body.longitude,
                timezone: body.timezone,
                currentSummary: body.currently.summary,
                currentTemperature: body.currently.temperature
            }

            callback(undefined, data)
        }
    })
}

// weather(40, -80, (err, data) => {
//     if (data === undefined) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// }) //lat long

module.exports = { weather: weather }