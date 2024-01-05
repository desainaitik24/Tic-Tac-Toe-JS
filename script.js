// Initialize game variables
let currentPlayer = "X"; // Player X goes first
let gameWon = false; // The game hasn't been won yet
let moves = 0; // Keep track of how many moves have been made
const winningCombinations = [
  ["cell00", "cell01", "cell02"], // Top row
  ["cell10", "cell11", "cell12"], // Middle row
  ["cell20", "cell21", "cell22"], // Bottom row
  ["cell00", "cell10", "cell20"], // Left column
  ["cell01", "cell11", "cell21"], // Middle column
  ["cell02", "cell12", "cell22"], // Right column
  ["cell00", "cell11", "cell22"], // Diagonal from top left to bottom right
  ["cell02", "cell11", "cell20"], // Diagonal from top right to bottom left
];

// Add event listeners to each cell
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    // Only make a move if the cell is empty and the game hasn't been won yet
    if (!gameWon && !cell.innerHTML) {
      cell.innerHTML = currentPlayer;
      checkForWin(); // Check if the move resulted in a win
      switchPlayer(); // Switch to the other player's turn
      moves++;
      if (!gameWon && moves === 9) {
        // If the game hasn't been won and all cells are full, it's a tie
        document.getElementById("message").innerHTML = "It's a tie!";
      }
    }
  });
});

// Add event listener to restart button
document.getElementById("restart").addEventListener("click", () => {
  resetGame();
});

// Function to check for a win
function checkForWin() {
  winningCombinations.forEach((combination) => {
    if (
      document.getElementById(combination[0]).innerHTML === currentPlayer &&
      document.getElementById(combination[1]).innerHTML === currentPlayer &&
      document.getElementById(combination[2]).innerHTML === currentPlayer
    ) {
      // If the current player has all three cells in a winning combination, they win
      document.querySelector("#message").innerHTML = "Player " + currentPlayer + " wins!";
      gameWon = true;
      alert("Player " + currentPlayer + " Wins! 🎉");
      setTimeout(function() {
        resetGame();
      }, 1300);
      return;
    }
  });
}

// Function to switch to the other player's turn
function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  document.getElementById("message").innerHTML = "Player " + currentPlayer + "'s turn";
}

// Function to reset the game
function resetGame() {
  // Clear all cell contents
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
  });
  // Reset game variables
  currentPlayer = "X";
  gameWon = false;
  moves = 0;
  document.getElementById("message").innerHTML = "Player " + currentPlayer + "'s turn";
}
