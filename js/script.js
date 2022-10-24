const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", playerOneMove);
});

function playerOneMove(event) {
  const target = event.currentTarget;
  console.log(target);
  target.classList.add("player-one");
}
