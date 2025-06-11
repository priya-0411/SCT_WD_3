const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  cells = [];
  gameOver = false;
  status.textContent = "Player X's Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (gameOver || cells[index].textContent) return;
  cells[index].textContent = currentPlayer;

  const winningPattern = checkWinner();
  if (winningPattern) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
    drawStrike(winningPattern);
  } else if (cells.every(cell => cell.textContent)) {
    status.textContent = "It's a Draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.find(([a, b, c]) =>
    cells[a].textContent &&
    cells[a].textContent === cells[b].textContent &&
    cells[a].textContent === cells[c].textContent
  );
}

function drawStrike(pattern) {
  const strike = document.createElement('div');
  strike.classList.add('strike');

  // Define known line styles for each win pattern
  const lineStyles = {
    "0,1,2": { top: "16.66%", left: "0", width: "100%", transform: "none" }, // row 1
    "3,4,5": { top: "50%", left: "0", width: "100%", transform: "none" },     // row 2
    "6,7,8": { top: "83.33%", left: "0", width: "100%", transform: "none" },  // row 3

    "0,3,6": { top: "0", left: "16.66%", width: "100%", transform: "rotate(90deg)" }, // col 1
    "1,4,7": { top: "0", left: "50%", width: "100%", transform: "rotate(90deg)" },    // col 2
    "2,5,8": { top: "0", left: "83.33%", width: "100%", transform: "rotate(90deg)" }, // col 3

    "0,4,8": { top: "0", left: "0", width: "141.42%", transform: "rotate(45deg)" },   // diagonal TL-BR
    "2,4,6": { top: "0", left: "0", width: "141.42%", transform: "rotate(-45deg)" }   // diagonal TR-BL
  };

  const key = pattern.sort((a, b) => a - b).join(',');
  const style = lineStyles[key];

  if (!style) return;

  strike.style.top = style.top;
  strike.style.left = style.left;
  strike.style.width = style.width;
  strike.style.transform = style.transform;

  board.appendChild(strike);
}



function restartGame() {
  currentPlayer = 'X';
  createBoard();
}

createBoard();
