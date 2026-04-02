const SIZE = 4;
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = Array(SIZE * SIZE).fill(null);
let current = 'X';
let running = true;

// generate winning lines for SIZE x SIZE grid
const wins = [];
// rows
for (let r = 0; r < SIZE; r++) {
  const row = [];
  for (let c = 0; c < SIZE; c++) row.push(r * SIZE + c);
  wins.push(row);
}
// cols
for (let c = 0; c < SIZE; c++) {
  const col = [];
  for (let r = 0; r < SIZE; r++) col.push(r * SIZE + c);
  wins.push(col);
}
// diagonals
const d1 = [];
const d2 = [];
for (let i = 0; i < SIZE; i++) {
  d1.push(i * SIZE + i);
  d2.push(i * SIZE + (SIZE - 1 - i));
}
wins.push(d1, d2);

function updateStatus(text) { statusEl.textContent = text; }

function checkWin() {
  for (const combo of wins) {
    const first = board[combo[0]];
    if (!first) continue;
    if (combo.every(i => board[i] === first)) return first;
  }
  return board.every(Boolean) ? 'draw' : null;
}

function handleClick(e) {
  const idx = Number(e.target.dataset.index);
  if (!running || board[idx]) return;
  board[idx] = current;
  e.target.textContent = current;
  const result = checkWin();
  if (result === 'draw') {
    updateStatus(\"It's a draw\");
    running = false;
    cells.forEach(c => c.classList.add('disabled'));
  } else if (result) {
    updateStatus(`Player ${result} wins`);
    running = false;
    cells.forEach(c => c.classList.add('disabled'));
  } else {
    current = current === 'X' ? 'O' : 'X';
    updateStatus(`Player ${current}'s turn`);
  }
}

function restart() {
  board.fill(null);
  current = 'X';
  running = true;
  cells.forEach(c => { c.textContent = ''; c.classList.remove('disabled'); });
  updateStatus(`Player ${current}'s turn`);
}

cells.forEach(c => c.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
