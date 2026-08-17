(function () {
  const COUNTER_NAMESPACE = "h2go-gayathribalasubramani";
  const COUNTER_KEY = "bottle-taps";

  const fromBottle = new URLSearchParams(location.search).get("src") === "nfc";
  const endpoint = fromBottle ? "hit" : "get";

  const counterEl = document.getElementById("counter-value");
  fetch(`https://abacus.jasoncameron.dev/${endpoint}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`)
    .then((r) => r.json())
    .then((data) => {
      counterEl.textContent = data.value;
    })
    .catch(() => {
      counterEl.textContent = "?";
    });

  if (!fromBottle) {
    document.getElementById("notice").hidden = false;
  }

  const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  function winnerOf(board) {
    for (const [a, b, c] of LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.every(Boolean) ? "draw" : null;
  }

  function bestMove(board, player) {
    const outcome = winnerOf(board);
    if (outcome === "O") return { score: 1 };
    if (outcome === "X") return { score: -1 };
    if (outcome === "draw") return { score: 0 };

    const moves = board
      .map((cell, i) => (cell ? null : i))
      .filter((i) => i !== null)
      .map((i) => {
        const next = board.slice();
        next[i] = player;
        return { index: i, score: bestMove(next, player === "O" ? "X" : "O").score };
      });

    return player === "O"
      ? moves.reduce((best, m) => (m.score > best.score ? m : best))
      : moves.reduce((best, m) => (m.score < best.score ? m : best));
  }

  let board = Array(9).fill(null);
  let gameOver = false;

  const tttToggle = document.getElementById("ttt-toggle");
  const tttGame = document.getElementById("ttt-game");
  const tttStatus = document.getElementById("ttt-status");
  const cells = Array.from(document.querySelectorAll(".ttt-cell"));

  function render() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i] || "";
      cell.disabled = gameOver || !!board[i];
    });
  }

  function setStatus(text) {
    tttStatus.textContent = text;
  }

  function endIfOver() {
    const outcome = winnerOf(board);
    if (!outcome) return false;
    gameOver = true;
    setStatus(outcome === "draw" ? "Draw!" : outcome === "X" ? "You win!" : "Computer wins!");
    render();
    return true;
  }

  function resetGame() {
    board = Array(9).fill(null);
    gameOver = false;
    setStatus("Your turn — you're X");
    render();
  }

  tttToggle.addEventListener("click", () => {
    tttGame.hidden = !tttGame.hidden;
    if (!tttGame.hidden) resetGame();
  });

  document.getElementById("ttt-reset").addEventListener("click", resetGame);

  document.getElementById("ttt-board").addEventListener("click", (e) => {
    const cell = e.target.closest(".ttt-cell");
    if (!cell || gameOver) return;
    const i = Number(cell.dataset.i);
    if (board[i]) return;

    board[i] = "X";
    render();
    if (endIfOver()) return;

    setStatus("Computer's turn…");
    setTimeout(() => {
      const { index } = bestMove(board, "O");
      board[index] = "O";
      render();
      if (!endIfOver()) setStatus("Your turn — you're X");
    }, 300);
  });
})();
