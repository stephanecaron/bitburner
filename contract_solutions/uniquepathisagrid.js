grid = [2,4]

const rightMoves = grid[0] - 1;
const downMoves = grid[1] - 1;

console.log(Math.round(factorialDivision(rightMoves + downMoves, rightMoves) / (factorial(downMoves))));

function factorialDivision(n, d) {
    if (n == 0 || n == 1 || n == d)
        return 1;
    return factorialDivision(n - 1, d) * n;
}

function factorial(n) {
    return factorialDivision(n, 1);
}