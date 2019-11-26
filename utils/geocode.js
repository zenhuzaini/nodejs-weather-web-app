const request = require('request')

const geocode = (area, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?limit=1&access_token=pk.eyJ1IjoiemVuaHV6YWluaSIsImEiOiJjanlzeXRobTQwMTZ3M2JwMXFsdXFlbDdsIn0.-MWjWymxxtz1_1BbMPmmRg`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('no internet connection', undefined)
        } else if (bosy.features === 0) {
            callback('please enter correct area, address, town', undefined)
        } else {
            const data = {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                query: body.query[0]
            }

            callback(undefined, data)
        }
    })
}

// geocode('jakarta', (error, data) => {
//     if (data === undefined) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
//     // console.log('error : ', error)
//     // console.log('data : ', data)
// })

module.exports = { geocode: geocode }
