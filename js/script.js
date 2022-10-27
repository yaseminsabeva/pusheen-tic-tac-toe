let xTurn = true;
let board = ["", "", "", "", "", "", "", "", ""];

const catTreats = document.querySelector('.cat-treat');
const dogTreats = document.querySelector('.dog-treat');
const shopCells = document.querySelectorAll('.shop-cells');
const cells = document.querySelectorAll(".cell");
const victoryScreen = document.querySelector(".victory-screen");
const restartButton = document.querySelector('.play-again-btn');
const restoreButton = document.querySelector('.restore');
const boardElement = document.querySelector('.board');

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

shopCells.forEach((item) => {
  item.addEventListener('click', buyAvatar);
})

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
      draw();
    }
  //horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    ) {
        victoryFun();
    }
  }
  //vertical
  for (let i = 0; i < 9; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    ) {
        victoryFun();
    }
  }
  //diagonal
  if (
    board[4] !== "" && ((board[0] === board[4] && board[0] === board[8]) ||
    (board[2] === board[4] && board[2] === board[6]))
  ) {
    victoryFun();
  }
}

function victoryFun() {
  victoryScreen.classList.remove("hidden");
  if (!xTurn) {
    document.querySelector(".winner-picture").classList.add("player-one");
    document.querySelector(".message").textContent = "💖✨ Player 1 wins! ✨💖";
    catTreats.textContent++;
  } else if (xTurn) {
    document.querySelector(".winner-picture").classList.add("player-two");
    document.querySelector(".message").textContent = "💖✨ Player 2 wins! ✨💖";
    dogTreats.textContent++;
  } 
}

function draw() {
    victoryScreen.classList.remove("hidden");
    document.querySelector(".message").textContent = "Oopsies, looks like it's a draw 😳";
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    victoryScreen.classList.add("hidden")
    document.querySelector('.winner-picture').classList.remove('player-one', 'player-two')
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('player-one', 'player-two');
    });
    board = board.map(() => '');
}

function buyAvatar(event) {
  const target = event.currentTarget;
  const priceElement = target.querySelector('.price');
  const price = priceElement.querySelector('span').textContent;
  const skin = target.classList[0];
  const treatsBalance = priceElement.classList.contains('cat') ? catTreats : dogTreats;
  if(Number(price) <= treatsBalance.textContent) {
    priceElement.querySelector('span').textContent = 0
    target.classList.add("out-of-stock")
    if(priceElement.classList.contains('cat')){
      boardElement.classList.remove('unicorn','pip')
      victoryScreen.classList.remove('unicorn','pip')
    } else {
      boardElement.classList.remove('lulu','tommy')
      victoryScreen.classList.remove('lulu','tommy')
    }
    boardElement.classList.add(skin)
    victoryScreen.classList.add(skin)
    treatsBalance.textContent = Number(treatsBalance.textContent) - Number(price)
  };
};

restoreButton.addEventListener('click', restoreSkin)

function restoreSkin() {
  boardElement.className = "board box-design"
  victoryScreen.className = "victory-screen hidden"
}
