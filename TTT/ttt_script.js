const k = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.table(k);

function GameBoard() {
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


  //Function to mark the values of the board
  
  const markValues = (row, col, player) => {
    if (board[row][col].getCellValue() === 0) {
      board[row][col].setCellValue(player);
    }
  };


  //Function to display the board value to console

  const displayBoard = ()=>{
    const boardVals = board.map((row)=> row.map(cell => cell.getCellValue()));
    console.table(boardVals);
  }

  return{displayBoard};
}

function ticCell() {
  let value = 0;

  const setCellValue = player => {
    value = player;
  };

  const getCellValue = () => value;

  return { setCellValue, getCellValue };
}

const kl = GameBoard();
kl.displayBoard();
