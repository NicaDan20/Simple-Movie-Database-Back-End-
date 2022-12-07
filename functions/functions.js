// Using the title and the uuid of a movie object, generates a unique numeric identifier that will be used to display individual movie pages

const slugify = require('slugify')

function generateUnique(stringSeed) {
    primeNumber = 97
    seedArray = stringSeed.split('-')
    let {hash, firstCharHash, lastCharHash} = computeHashesFromString(seedArray)
    hashDigitSum = addDigits(hash)
    firstCharHash %= hashDigitSum
    lastCharHash /= hashDigitSum
    hash <<= firstCharHash
    hash *= (primeNumber / lastCharHash) + hashDigitSum
    return Math.floor(hash).toString()
}

// helper function which adds all the digits of a number

function addDigits (value) {
    let sum = 0
    while (value) {
        sum += value % 10
        value = Math.floor(value/10)
    }
    return sum
}

// helper function which generates several numeric values:
// 1) The sum of the total ascii values in the movie title
// 2) The sum of the total ascii values of every first character of every word in the movie title
// 3) The sum of the total ascii values of every last character of every word in the movie title

function computeHashesFromString (seedArray) {
    let hash = 0
    let firstCharHash = 0
    let lastCharHash = 0
    seedArray.forEach(seed => {
        for (i=0;i<seed.length;i++) {
            if (i==0) {
                firstCharHash += seed.charCodeAt(i)
            }
            if (i==seed.length-1) {
                lastCharHash += seed.charCodeAt(i)
            }
            hash += seed.charCodeAt(i)
        }
    })
    return {hash, firstCharHash, lastCharHash}
}

// Date format: 2012-11-12 --> Dec 11 2012

function prettyFormatDate (date) {
    if (date) {
        let dateToStr = date.toUTCString().split(' ')
        let prettyDate = dateToStr[2] + ' ' + dateToStr[1] + ' ' + dateToStr[3]
        return prettyDate    
    } else {
        return null
    }
}

function calculateAge (birthday, date_of_death) {
    console.log(date_of_death)
    if (date_of_death) {
        endingDate = new Date(date_of_death)
    } else {
        endingDate = Date.now()
    }
    return Math.floor(((endingDate - new Date(birthday)) / (31557600000)))
}

function createDirectorSlug (value, uuid) {
    let slugged = slugify(value, {
        lower: true,
        strict: true
      })
      let random = generateUnique(uuid)
      return [slugged, random].join('-')
}

module.exports = {generateUnique, prettyFormatDate, calculateAge, createDirectorSlug}