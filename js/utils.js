'use strict'
// build board
   // var board = [];
    // for (var i = 0; i < rowsCount; i++) {
    //     board[i] = [];
    //     for (var j = 0; j < colsCount; j++) {
    //         var cell = {
    //             minesAroundCount: setMinesNegsCount(i, j, board),
    //             isShown: true,
    //             isMine: false,
    //             isMarked: false
    //         }
    //         board[i][j] = cell
    //     }
    // }
    // return board;
//Building a matrix. 


//function setmines..{
       // var minesIdx = []
    // for (var i = 0; i < countMines; i++) {
    //     var randomRow = getRandomInt(0, gSize)
    //     var randomCol = getRandomInt(0, gSize)
    //     var cell = randomRow + "" + randomCol
    //     while (minesIdx.includes(cell)) {
    //         randomRow = getRandomInt(0, gSize)
    //         randomCol = getRandomInt(0, gSize)
    //         cell = randomRow + "" + randomCol
    //     }
    //     minesIdx.push(cell)
    //     board[cell].type = MINES
    // }
    // return board
//}
function createMat(ROWS, COLS) {
    var mat = [];
    for (var i = 0; i < ROWS; i++) {
        var row = [];
        for (var j = 0; j < COLS; j++) {
            row.push('');
        }
        mat.push(row);
    }
    return mat;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomizedNums() {
    var rndNums = [];
    for (var i = 0; i < gNums.length; i++) {
        var rndNum = drawNum();
        rndNums.push({ value: rndNum, isHit: false });
        i--;
    }
    return rndNums;
}

function getRandomNum(maxNum) {
    return Math.floor(Math.random() * maxNum);
}