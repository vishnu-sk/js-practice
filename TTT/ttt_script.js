const k = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// console.table(k);

//Using IIFE module since we need only a single instance of GameBoard
// to be used across the project

const GameBoard = (() => {
  const rowL = 3;
  const colL = 3;
  board = [];

  //Creating board in JS. Here a 2-D rowL x colL array will represent the Board
  //where tic-tac-toe is played. Each cell is created with another object ticCell

  for (i = 0; i < rowL; i++) {
    board[i] = [];
    for (j = 0; j < colL; j++) {
      board[i].push(ticCell());
    }
  }

  const getBoard = () => board;

  //Function to mark the values of the board

  const markValues = (row, col, player) => {
    if (board[row][col].getCellValue() === -2) {
      board[row][col].setCellValue(player);
      return true;
    }
    return false;
  };

  //Function to display the board value to console

  const displayBoard = () => {
    const boardVals = board.map(row => row.map(cell => cell.getCellValue()));
    console.table(boardVals);
  };

  return { getBoard, markValues, displayBoard };
})();

//Function for a single cell inside game board
//This allows us to modify cell value without exposing the cell value

function ticCell() {
  let value = -2;

  //Function to set a cell value

  const setCellValue = player => {
    value = player;
  };

  //Function to get a cell value

  const getCellValue = () => value;

  return { setCellValue, getCellValue };
}

function playGame(playerOne = "Player One", playerTwo = "Player Two") {
  const players = [
    { name: playerOne, token: 1 },
    { name: playerTwo, token: 2 },
  ];

  //const gameBoard = GameBoard();
  //   const board = gameBoard.getBoard();
  let _activePlayer = players[0];

  const switchPlayer = () => {
    _activePlayer = _activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => _activePlayer;

  const displayBoardAfterRound = () => GameBoard.displayBoard();

  const playRound = (row, col) => {
    const rowVal = parseInt(row);
    const colVal = parseInt(col);

    if (!isNaN(rowVal) && !isNaN(colVal)) {
      if (GameBoard.markValues(rowVal, colVal, _activePlayer.token)) {
        switchPlayer();
      } else {
        console.log("The cell is already filled. Choose another one...");
      }
    }
    displayBoardAfterRound();
    console.log("Active Player:" + _activePlayer.name);
  };

  // const isGameOver = () => {
  //   const board = gameBoard.getBoard();
  //   // return;

  //   const r1 = board.map(
  //     row =>
  //       row.reduce(
  //         (won, cell) => {
  //           const cellVal = cell.getCellValue();
  //           if (cellVal !== 0) {
  //             if (!won.won) {
  //               return won;
  //             } else {
  //               if (won.element == cellVal || won.element == null) {
  //                 return { won: true, element: cellVal };
  //               }
  //             }
  //           } else {
  //             return { won: false, element: cellVal };
  //           }
  //         },
  //         { won: true, element: null }
  //       )
  //     //   console.log(c);
  //   );

  //   console.log(r1.some(k => k.won));
  //   console.log(r1.filter(k => k.won == true)[0].element);
  // };

  const getRowColSum = () => {
    const board = GameBoard.getBoard();
    let rowSum = [0, 0, 0];
    let colSum = [0, 0, 0];
    let diaSum = [0, 0, 0];

    //setting colsum and rowSum arrays as zero
    //iterating through cols(for loop ) and through rows(forEach)
    //and then finding sum of a elements in a column
    //and assigning it to colSum
    const colLen = board[0].length;
    for (let i = 0; i < colLen; i++) {
      let s = 0;
      diaSum[0] += board[i][i].getCellValue();
      diaSum[1] += board[i][colLen - i - 1].getCellValue();

      board.forEach(row => {
        colSum[i] += row[i].getCellValue();
      });
    }

    //iterating through rows and finding row Sum
    //Setting the value of empty cells (or cell with value 0) as -2
    //so that no combination of invalid row/col sum is equal to 3 or 6
    rowSum = board.map(row =>
      row.reduce((sum, elem) => {
        sum += elem.getCellValue();
        return sum;
      }, 0)
    );

    console.log(colSum);
    console.log(rowSum);
    console.log(diaSum);

    return [...rowSum, ...colSum, ...diaSum];
  };

  const getWinner = () => {
    const sumArray = getRowColSum();
    if (sumArray.includes(3)) {
      return playerOne;
    } else if (sumArray.includes(6)) {
      return playerTwo;
    } else {
      return null;
    }
  };

  return {
    playRound,
    getActivePlayer,
    displayBoardAfterRound,
    getRowColSum,
  };
}

const UIAction = (function () {
  const cell = $(".div-cell");
  const gridCont = $(".grid-cont");
  const board = GameBoard.getBoard();
  const gameCtrl = playGame();

  function renderDOMBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellVal = board[i][j].getCellValue();
        if (cellVal == -2) {
          cell[i * 3 + j].innerText = ":";
        } else if (cellVal == 1) {
          cell[i * 3 + j].innerText = "O";
        } else if (cellVal == 2) {
          cell[i * 3 + j].innerText = "X";
        }
      }
    }

  }

  function setDOMBoardVals() {
    cell.on("click", e => {
      const c = e.target.getAttribute("data-id");
      let i =  parseInt(c/3);
      let j = c%3;
      gameCtrl.playRound(i,j);
      renderDOMBoard();
    });
  }

  function setScoreBoard(){

  }

  renderDOMBoard();
  setDOMBoardVals();

 
})();

