/* =====================
   TIC TAC TOE
===================== */
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

window.onload = () => {
  if (document.getElementById("board")) loadBoard();
};

function loadBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  board.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = value;
    cell.onclick = () => handleMove(index);
    boardDiv.appendChild(cell);
  });
}

function handleMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  loadBoard();

  if (gameActive) {
    document.getElementById("status").innerText =
      `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      document.getElementById("status").innerText =
        `Player ${board[a]} Wins! 🎉`;
      return;
    }
  }

  if (!board.includes("")) {
    document.getElementById("status").innerText = "It's a Draw!";
    gameActive = false;
  }
}

function resetTicTac() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").innerText = "Player X's Turn";
  loadBoard();
}

/* =====================
   ROCK PAPER SCISSORS
===================== */
let userScore = 0;
let computerScore = 0;

function playRPS(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const comp = choices[Math.floor(Math.random() * 3)];

  displayChoices(userChoice, comp);

  let result = "";

  if (userChoice === comp) result = "Draw!";
  else if (
    (userChoice === "rock" && comp === "scissors") ||
    (userChoice === "paper" && comp === "rock") ||
    (userChoice === "scissors" && comp === "paper")
  ) {
    result = "You Win! 🎉";
    userScore++;
  } else {
    result = "You Lose!";
    computerScore++;
  }

  document.getElementById("rps-result").innerText = result;
  document.getElementById("score").innerText =
    `You: ${userScore} | Computer: ${computerScore}`;
}

function displayChoices(user, comp) {
  const icons = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  };

  document.getElementById("youChoice").innerHTML = icons[user];
  document.getElementById("compChoice").innerHTML = icons[comp];
}

function resetRPS() {
  userScore = 0;
  computerScore = 0;

  document.getElementById("score").innerText = `You: 0 | Computer: 0`;
  document.getElementById("rps-result").innerText = "";
  document.getElementById("youChoice").innerText = "";
  document.getElementById("compChoice").innerText = "";
}
