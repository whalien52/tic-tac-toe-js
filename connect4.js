/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let boardRow = [];
  for (var y = 0; y < HEIGHT; y++) { //rows
    boardRow[y] = [];
    for(var x = 0; x < WIDTH; x++) { // columns
      boardRow[y][x] = [];
    }
  }
  board = boardRow;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
let htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  let rowNum = null;
  for(let row of board) {
    if (row[x] == '') {
      rowNum++;
    }
  }
  if (rowNum == board.length) {
    rowNum -1;
  }
  console.log(rowNum -1 + " - this is the returned row");
  return rowNum - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let htmlBoard = document.getElementById('board');
  let cellNum = y + '-' + x;
  console.log(cellNum);
  let cell = document.getElementById(cellNum);
  let piece = document.createElement('div');
  console.log(cell);
  cell.classList.add('player-'+currPlayer);
  piece.classList.add('piece');
  cell.append(piece);
}


function endGame(msg) {
  window.alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer; // updating the board
  placeInTable(y, x); //updating the table (frontend)

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  function checkBoardStatus() {
    console.log('checking board status');
    return boardFull = board.every(function(row){
      return row.every(function(column) {
        return column != '';
      });
    });
  }
  let boardStatus = checkBoardStatus();
  if (boardStatus) {
    endGame("Game Over");
  }

  // switch players
  if (currPlayer == 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer //checks to see if the board value === current player value
    );
  }


  for (var y = 0; y < HEIGHT; y++) { // for each row
    for (var x = 0; x < WIDTH; x++) { // for each piece (column) in the row
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //checking for horizontal win
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // vert win
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //diagonal right win
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //diagonal left win

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // check every option with OR
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
