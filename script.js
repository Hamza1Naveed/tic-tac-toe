const SIZE = 4;

window.addEventListener('DOMContentLoaded', () => {
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  if (!boardEl) return;

  // generate cells if not present
  if (!boardEl.querySelector('.cell')) {
    boardEl.innerHTML = '';
    for (let i = 0; i < SIZE * SIZE; i++) {
      const d = document.createElement('div');
      d.className = 'cell';
      d.dataset.index = i;
      boardEl.appendChild(d);
    }
  }

  boardEl.style.gridTemplateColumns = `repeat(${SIZE}, 80px)`;

  const cells = Array.from(document.querySelectorAll('.cell'));
  let board = Array(SIZE * SIZE).fill(null);
  let current = 'X';
  let running = true;

  // build winning combos
  const wins = [];
  for (let r = 0; r < SIZE; r++) {
    const row = [];
    for (let c = 0; c < SIZE; c++) row.push(r * SIZE + c);
    wins.push(row);
  }
  for (let c = 0; c < SIZE; c++) {
    const col = [];
    for (let r = 0; r < SIZE; r++) col.push(r * SIZE + c);
    wins.push(col);
  }
  const d1 = [], d2 = [];
  for (let i = 0; i < SIZE; i++) {
    d1.push(i * SIZE + i);
    d2.push(i * SIZE + (SIZE - 1 - i));
  }
  wins.push(d1, d2);

  function updateStatus(t) { statusEl.textContent = t; }

  function checkWin() {
    for (const combo of wins) {
      const first = board[combo[0]];
      if (!first) continue;
      if (combo.every(i => board[i] === first)) return first;
    }
    return board.every(Boolean) ? 'draw' : null;
  }

  function handleClick(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (!running || board[idx]) return;
    board[idx] = current;
    e.currentTarget.textContent = current;
    const result = checkWin();
    if (result === 'draw') {
      updateStatus("It's a draw");
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
  if (restartBtn) restartBtn.addEventListener('click', restart);

  updateStatus(`Player ${current}'s turn`);
});
