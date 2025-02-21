const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const gameStatus = document.getElementById('game-status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameStatus.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameStatus.textContent = "It's a Tie!";
    gameActive = false;
  }
}

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-cell-index');

  if (gameBoard[cellIndex] || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

