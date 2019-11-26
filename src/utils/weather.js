const request = require('request')

const weather = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8593f986c0f88727f3270a097ee4b90c/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback('check your inet connection', undefined)
        } else if (response.body.error) {
            callback('check your latitude / longitude', undefined)
        } else {
            const data = {
                latitude: response.body.latitude,
                longitude: response.body.longitude,
                timezone: response.body.timezone,
                currentSummary: response.body.currently.summary,
                currentTemperature: response.body.currently.temperature,
                // all: response.body
            }

            callback(undefined, data)
        }
    })
}

module.exports = { weather }