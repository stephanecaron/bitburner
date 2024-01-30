const input = ["LOGINDEBUGTRASHCLOUDPRINT","INTERFACE"]
const plaintext = input[0]
const keyword = input[1]

function letterToNumber(letter) {
    return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}

let result = []

for (let i = 0; i<plaintext.length;i++) {
    let keywordLetter = i >= keyword.length ? keyword[i % keyword.length] : keyword[i];
    let plaintextLetter = plaintext[i]
    let newLetterNumber = letterToNumber(keywordLetter)+letterToNumber(plaintextLetter)
    let truncatedNewLetterNumber = newLetterNumber > 25 ? newLetterNumber-26 : newLetterNumber
    result.push(String.fromCharCode(truncatedNewLetterNumber+65))
}

console.log(result.join(''))