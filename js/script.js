let xTurn = true;
let isGameOver = false;
const board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function playerOneMove(target) {
  target.classList.add("player-one");
  board[target.id] = "X";
}

function playerTwoMove(target) {
  target.classList.add("player-two");
  board[target.id] = "O";
}

function handleCellClick(event) {
  const target = event.currentTarget;
  if (
    target.classList.contains("player-one") ||
    target.classList.contains("player-two")
  )
    return;
  if (xTurn) playerOneMove(target);
  else playerTwoMove(target);
  xTurn = !xTurn;
  gameWon();
}

function gameWon() {
    //draw
    if (!board.includes('')) {
    isGameOver = true
    draw()
    }
  //horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    )
      victoryFun();
      isGameOver = true
  }
  //vertical
  for (let i = 0; i < 9; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    )
      victoryFun();
      isGameOver = true
  }
  //diagonal
  if (
    board[4] !== "" && ((board[0] === board[4] && board[0] === board[8]) ||
    (board[2] === board[4] && board[2] === board[6]))
  ) {
    victoryFun();
    isGameOver = true
  }
}

function victoryFun() {
  const victoryScreen = document.querySelector(".victory-screen");
  victoryScreen.classList.remove("hidden");
  if (!xTurn) {
    document.querySelector(".winner-picture").classList.add("player-one");
    document.querySelector(".message").textContent = "💖✨ Player 1 wins! ✨💖";
  } else if (xTurn) {
    document.querySelector(".winner-picture").classList.add("player-two");
    document.querySelector(".message").textContent = "💖✨ Player 2 wins! ✨💖";
  } 
}

function draw() {
    const victoryScreen = document.querySelector(".victory-screen");
    victoryScreen.classList.remove("hidden");
    document.querySelector(".message").textContent = "Oopsies, looks like it's a draw 😳";
}