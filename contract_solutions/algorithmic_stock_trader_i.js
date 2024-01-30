const stocks = '133,116,60,145,114,91,72,186,132,174,26,112,167,123,171,100'
let stocksArray = stocks.split(',')
let biggestGap = 0
    for (let i = 0;i<stocksArray.length;i++) {
        for (let j = i+1; j<stocksArray.length;j++) {
            biggestGap = Math.max(biggestGap,(parseInt(stocksArray[j])-parseInt(stocksArray[i])))
        }
    }
    console.log(biggestGap)