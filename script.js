const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill(null);
let current = 'X';
let running = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(text){ statusEl.textContent = text; }

function checkWin(){
  for (const [a,b,c] of wins){
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? 'draw' : null;
}

function handleClick(e){
  const idx = Number(e.target.dataset.index);
  if (!running || board[idx]) return;
  board[idx] = current;
  e.target.textContent = current;
  const result = checkWin();
  if (result === 'draw'){
    updateStatus("It's a draw");
    running = false;
    cells.forEach(c => c.classList.add('disabled'));
  } else if (result){
    updateStatus(`Player ${result} wins`);
    running = false;
    cells.forEach(c => c.classList.add('disabled'));
  } else {
    current = current === 'X' ? 'O' : 'X';
    updateStatus(`Player ${current}'s turn`);
  }
}

function restart(){
  board.fill(null);
  current = 'X';
  running = true;
  cells.forEach(c => { c.textContent=''; c.classList.remove('disabled'); });
  updateStatus(`Player ${current}'s turn`);
}

cells.forEach(c => c.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);