// define sample function to randomly return an item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generatePassword function
function generateUrl() {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // define dummy data
  // ...

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))

  // start generating password
  let randomUrl = ''
  for (let i = 0; i < 5; i++) {
    randomUrl += sample(collection)
  }

  // return the generated password
  return randomUrl
}

module.exports = generateUrl
