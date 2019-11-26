const request = require('request')

const movie = (title, callback) => {
    const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=1edc130&s=' + title
    request({ url, json: true }, (err, res) => {
        // const coba = res.body.title[0]
        if (err) {
            callback('error because of no internet!', undefined)
        } else if (res.Error === "Movie not found!") {
            callback('movie not found', undefined)
        } else {
            const data = res.body.Search
            let saveMovies = []

            data.forEach((result) => {
                saveMovies.push(result)
            });


            callback(undefined, saveMovies)
        }
    })
}

movie('Avenger', (err, data) => {
    if (data === undefined) {
        console.log(err)
    } else {

        console.log(data)
    }
})


const arr = ['1', { name: 'siti' }, '2', '3']
let help = []
console.log(help)

arr.forEach(element => {
    help.push(element)
});

console.log(help)

help.push('9')

console.log(help)