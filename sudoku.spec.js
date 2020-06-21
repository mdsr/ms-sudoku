const Chai = require('chai');
const expect = Chai.expect;
const sudoku = require('./sudoku');

const board =
    '090000006\n' +
    '000960485\n' +
    '000581000\n' +
    '004000000\n' +
    '517200900\n' +
    '602000370\n' +
    '100804020\n' +
    '706000810\n' +
    '300090000';

const solvedBoard =
    '895742136\n' +
    '271963485\n' +
    '463581792\n' +
    '934617258\n' +
    '517238964\n' +
    '682459371\n' +
    '159874623\n' +
    '746325819\n' +
    '328196547';

const expectedSolution = [
    [8, 9, 5, 7, 4, 2, 1, 3, 6],
    [2, 7, 1, 9, 6, 3, 4, 8, 5],
    [4, 6, 3, 5, 8, 1, 7, 9, 2],
    [9, 3, 4, 6, 1, 7, 2, 5, 8],
    [5, 1, 7, 2, 3, 8, 9, 6, 4],
    [6, 8, 2, 4, 5, 9, 3, 7, 1],
    [1, 5, 9, 8, 7, 4, 6, 2, 3],
    [7, 4, 6, 3, 2, 5, 8, 1, 9],
    [3, 2, 8, 1, 9, 6, 5, 4, 7]
];

let parsedBoard = [];
let emptyPositions = [];

describe('#parseBoard()', () => {
    it('should parse a sudoku board to a 2d array', () => {
        const expectedBoard = [
            [0, 9, 0, 0, 0, 0, 0, 0, 6],
            [0, 0, 0, 9, 6, 0, 4, 8, 5],
            [0, 0, 0, 5, 8, 1, 0, 0, 0],
            [0, 0, 4, 0, 0, 0, 0, 0, 0],
            [5, 1, 7, 2, 0, 0, 9, 0, 0],
            [6, 0, 2, 0, 0, 0, 3, 7, 0],
            [1, 0, 0, 8, 0, 4, 0, 2, 0],
            [7, 0, 6, 0, 0, 0, 8, 1, 0],
            [3, 0, 0, 0, 9, 0, 0, 0, 0]
        ];

        parsedBoard = sudoku.parseBoard(board);

        expect(parsedBoard.length).to.equal(9);
        expect(parsedBoard[0].length).to.equal(9);
        expect(parsedBoard).to.eql(expectedBoard);
    });
});

describe('#unParseBoard()', () => {
    it('should un-parse a sudoku board to string', () => {
        const unParsedBoard = sudoku.unParseBoard(parsedBoard);
        expect(unParsedBoard).is.string;
        expect(unParsedBoard).to.eql(board);
    });
});

describe('getEmptyPositions()', () => {
    it('should save all empty positions, 0s of the parsed board', () => {
        const expectedPositions = [
            [0, 0], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 0], [1, 1],
            [1, 2], [1, 5], [2, 0], [2, 1], [2, 2], [2, 6], [2, 7], [2, 8], [3, 0],
            [3, 1], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [4, 4], [4, 5],
            [4, 7], [4, 8], [5, 1], [5, 3], [5, 4], [5, 5], [5, 8], [6, 1], [6, 2],
            [6, 4], [6, 6], [6, 8], [7, 1], [7, 3], [7, 4], [7, 5], [7, 8], [8, 1],
            [8, 2], [8, 3], [8, 5], [8, 6], [8, 7], [8, 8]
        ];

        emptyPositions = sudoku.getEmptyPositions(parsedBoard);

        expect(emptyPositions.length).to.equal(51);
        expect(emptyPositions).to.eql(expectedPositions);
    });
});

describe('#checkRow()', () => {
    it('should check each value in row does not equal to the input', () => {
        expect(sudoku.checkRow(parsedBoard, 0, 2)).to.be.ok;
        expect(sudoku.checkRow(parsedBoard, 0, 9)).to.not.be.ok;
    });
});

describe('#checkColumn()', () => {
    it('should check each value in column does not equal to the input', () => {
        expect(sudoku.checkColumn(parsedBoard, 0, 9)).to.be.ok;
        expect(sudoku.checkColumn(parsedBoard, 0, 5)).to.not.be.ok;
    });
});

describe('#checkSquare()', () => {
    it('should check each value in square does not equal to the input', () => {
        expect(sudoku.checkSquare(parsedBoard, 2, 2, 1)).to.be.ok;
        expect(sudoku.checkSquare(parsedBoard, 7, 7, 9)).to.be.ok;
        expect(sudoku.checkSquare(parsedBoard, 2, 2, 9)).to.not.be.ok;
        expect(sudoku.checkSquare(parsedBoard, 7, 7, 1)).to.not.be.ok;
    });
});

describe('#checkValue()', () => {
    it('should check whether the value is valid for particular position', () => {
        expect(sudoku.checkValue(parsedBoard, 0, 0, 2)).to.be.ok;
        expect(sudoku.checkValue(parsedBoard, 3, 3, 7)).to.be.ok;
        expect(sudoku.checkValue(parsedBoard, 0, 0, 9)).to.not.be.ok;
        expect(sudoku.checkValue(parsedBoard, 3, 7, 1)).to.not.be.ok;
    });
});

describe('#solvePuzzle()', () => {
    it('should find a solution to the puzzle passed in', () => {
        const solution = sudoku.solvePuzzle(parsedBoard, emptyPositions);
        expect(solution).to.be.eql(expectedSolution);
    });
});

describe('#solveSudoku()', () => {
    it('should find a solution to the puzzle string passed in', () => {
        const solution = sudoku.solveSudoku(board);
        expect(solution).to.be.eql(solvedBoard);
    });
});
