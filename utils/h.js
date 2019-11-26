const aku = ['3', '4', '6']

const [a, r, t] = aku

const w = (par, callback) => {
    const res = par.filter((hasil) => {
        return hasil !== '4'
    })

    callback(res)
}

w(aku, (parpar) => {

    console.log('dari function w')
    console.log(parpar)

    console.log('dari function w')
})


const objek = {
    obj1: 'obj1',
    obj2: 'obj2',
    obj3: 'obj3'
}

console.log(a)
console.log(r)

const { obj1, obj2, obj3 } = objek
// console.log(obj1)

function thefunction(arr, elementAdd) {
    const a = arr

    a.push(elementAdd)
    console.log(a)
}

thefunction(aku, { aku: 'bismillah', coba: 'ini' })