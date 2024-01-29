const inputString = 'nGGkkkkkkk577BB44b22ffIIIIIIIsyyKKEETTTTTTTTTTTTUUUUUUUUUUUUUQ'
let result = []
let currentChar
let currentCharCount = 1
for (const letter of inputString) {
    if (letter == currentChar && currentCharCount < 9) {
        currentCharCount++
    } else {
        result.push(currentCharCount,currentChar)
        currentChar = letter
        currentCharCount = 1
    }
}
console.log(result.join(''))

// need to trim first number (the first 1) and add the last character manually