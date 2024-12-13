const { PathFinder, Matrix } = require('./pathfinder'); // Adjust the path if necessary

const matrixData = [
    [0x9B, 0x10, 0x72, 0x10, 0x10],
    [0x10, 0x3A, 0x3A, 0x3A, 0x10],
    [0x72, 0xD4, 0x10, 0x10, 0x9B],
    [0x3A, 0x72, 0xD4, 0x9B, 0x9B],
    [0x72, 0x10, 0x10, 0x10, 0x10]
];

const start = [0, 0];  // Starting position (row, column)
const end = [4, 4];    // Ending position (row, column)

const matrix = new Matrix(matrixData);
const pathFinder = new PathFinder(matrix, 5); // Max path length is 5

const path = pathFinder.run(start, end);
console.log('Shortest Path:', path);
