function parseBoard(board) {
    return board.split('\n')
        .map(row => row.split('')
            .map(num => +num));
}

function unParseBoard(board) {
    return board
        .reduce((acc, row, i) =>
            acc += (i != 0 ? '\n' : '') + row.join(''), '');
}

function getEmptyPositions(board) {
    const emptyPositions = [];
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            board[r][c] === 0 ? emptyPositions.push([r, c]) : null;
        }
    }
    return emptyPositions;
}

function checkRow(board, row, value) {
    for (let r = 0; r < board[row].length; r++) {
        if (board[row][r] === value) {
            return false;
        }
    }
    return true;
}

function checkColumn(board, column, value) {
    for (let c = 0; c < board.length; c++) {
        if (board[c][column] === value) {
            return false;
        }
    }
    return true;
}

function checkSquare(board, row, column, value) {
    const squareSize = 3;
    let rowCorner = 0;
    let columnCorner = 0;

    while (row >= rowCorner + squareSize) {
        rowCorner += squareSize;
    }

    while (column >= columnCorner + squareSize) {
        columnCorner += squareSize;
    }

    for (let r = rowCorner; r < rowCorner + squareSize; r++) {
        for (let c = columnCorner; c < columnCorner + squareSize; c++) {
            if (board[r][c] === value) {
                return false;
            }
        }
    }

    return true;
}

function checkValue(board, row, column, value) {
    return checkRow(board, row, value)
        && checkColumn(board, column, value)
        && checkSquare(board, row, column, value);
}

function solvePuzzle(board, emptyPositions) {
    const limit = 9;
    let row = 0;
    let column = 0;
    let value = 0;
    let found = false;

    for (let i = 0; i < emptyPositions.length;) {
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];
        value = board[row][column] + 1;
        found = false;

        while (!found && value <= limit) {
            if (checkValue(board, row, column, value)) {
                found = true;
                board[row][column] = value;
                i++;
            } else {
                value++;
            }
        }

        if (!found) {
            board[row][column] = 0;
            i--;
        }
    }
    return board;
}

function solveSudoku(board) {
    const parsedBoard = parseBoard(board);
    const emptyPositions = getEmptyPositions(parsedBoard);
    const solvedBoard = solvePuzzle(parsedBoard, emptyPositions);
    return unParseBoard(solvedBoard);
}

module.exports = {
    parseBoard,
    unParseBoard,
    getEmptyPositions,
    checkRow,
    checkColumn,
    checkSquare,
    checkValue,
    solvePuzzle,
    solveSudoku,
};
