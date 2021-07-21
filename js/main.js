"use strict";

//
// Show a timer that starts on first click (right / left) and stops when game is over.
// • Left click reveals the cell’s content
// • Right click flags/unflags a suspected cell (you cannot reveal a flagged cell)

// Game ends when:
// o LOSE: when clicking a mine, all mines should be revealed
// o WIN: all the mines are flagged, and all the other cells are shown
// • Support 3 levels of the game
// o Beginner (4*4 with 2 MINES)
// o Medium (8 * 8 with 12 MINES)
// o Expert (12 * 12 with 30 MINES)

// • If you have the time, make your Minesweeper look great.
// • Expanding: When left clicking on cells there are 3 possible cases we want to address:
// o MINE – reveal the mine clicked
// o Cell with neighbors – reveal the cell alone
// o Cell without neighbors – expand it and its 1st degree neighbors

const MINE = "💣";
const FLAG = "🚩";
const EMTY = "";
const noRightClick = document.querySelector("myElement");

var gBoard;
var gLevel;
var gGame;

var gSelectedElCell = null;
var gCell = {
  minesAroundCount: 4,
  isShown: true,
  isMine: false,
};

var gLevel = [
  {
    SIZE: 4,
    MINE: 2,
  },
  {
    SIZE: 8,
    MINE: 12,
  },
  {
    SIZE: 12,
    MINE: 30,
  },
];

var gBoardSize = gLevel[0].SIZE;

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function initGame() {
  var board = buildBoard();
  renderBoard(board);
  // setMinesNegsCount(board)
}

// function selectedLevel(gBoardSize) {
//     if (onclick.value === '4') {
//         return gBoardSize = 4
//     } else if (onclick.value === '8') {
//         gBoardSize = 8
//     } else gBoardSize = 12
//     buildBoard()
//     initGame()
//      gameOver()
// }

//Build the game board
function buildBoard() {
  var board = [];
  for (var i = 0; i < 4; i++) {
    board.push([]);
    for (var j = 0; j < 4; j++) {
      board[i][j] = "";
      if ((i === 0 && j === 1) || (i === 3 && j === 1))
        board[i][j] = gCell.Mine = true;
    }
  }
  return board;
  // console.log(board);
}

function setMinesNegsCount(board) {
  var negsBordCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j] === MINE) negsBordCount++;
    }
  }
  return negBordCount;
}
//console.log('negBordCount', negBordCount);
function randomAssignMines(board, countMines) {
  var minesIdx = [];
  for (var i = 0; i < countMines; i++) {
    var randomRow = getRandomInt(0, gSize);
    var randomCol = getRandomInt(0, gSize);
    var cell = randomRow + "" + randomCol;
    while (minesIdx.includes(cell)) {
      randomRow = getRandomInt(0, gSize);
      randomCol = getRandomInt(0, gSize);
      cell = randomRow + "" + randomCol;
    }
    minesIdx.push(cell);
    board[cell].type = MINE;
  }
  return board;
}


function renderBoard(board) {
  // console.table(buildBoard());
  var strHtml = "";
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    strHtml += "<tr>";
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      var tdId = `cell-${i}-${j}`;
      strHtml += `<td id="${tdId}" onclick="cellClicked(this)">${cell}</td>`;
      // strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this, ${i}, ${j}); return false;">${cell}</td>`
    }
    strHtml += "</tr>";
  }
  var elCell = document.querySelector(".board");
  elCell.innerHTML = strHtml;
  // console.log('elCell', elCell);
}

function cellClicked(elCell, i, j) {
    
    
}



function cellMarked(elCell) {}

function checkGameOver() {}

function expandShown(board, elCell, i, j) {}


function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    // stopTimer()
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
}
