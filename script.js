// Select all the necessary elements from the HTML
let boxes = document.querySelectorAll(".box");         // All tic-tac-toe grid boxes
let resetBtn = document.querySelector("#reset-btn");       // Button to reset the game
let newGameBtn = document.querySelector("#new-btn");       // Button to start a new game
let msgContainer = document.querySelector(".msg-container"); // Container for displaying win/draw messages
let msg = document.querySelector("#msg");                  // Element to show the message text

// Initialize game state variables
let turnO = true;  // true means it's Player O's turn; false means it's Player X's turn
let count = 0;     // Counter to track the number of moves (used for draw detection)

// Define all winning patterns as arrays of box indexes 
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal from top-right to bottom-left
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Function to reset the game state
const resetGame = () => {
  turnO = true;            // Reset to Player O's turn
  count = 0;               // Reset move counter to 0
  enableBoxes();           // Re-enable all boxes and clear their text
  msgContainer.classList.add("hide"); // Hide the message container (win/draw message)
};

// Add click event listeners to each box for player moves
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // If it's Player O's turn, mark "O"; otherwise, mark "X"
    if (turnO) {
      box.innerText = "O"; // Set the box to "O"
      turnO = false;       // Switch turn to Player X
    } else {
      box.innerText = "X"; // Set the box to "X"
      turnO = true;        // Switch turn to Player O
    }
    box.disabled = true;   // Disable the clicked box so it can't be clicked again
    count++;               // Increment the move counter

    let isWinner = checkWinner(); // Check if the current move resulted in a win

    // If all 9 moves have been made and no winner is found, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw scenario
const gameDraw = () => {
  msg.innerText = "Game was a Draw.";  // Set the draw message
  msgContainer.classList.remove("hide"); // Display the message container
  disableBoxes();                      // Disable all boxes as the game is over
};

// Function to disable all boxes (used when the game ends)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // Disable each box
  }
};

// Function to enable all boxes and clear their text (used when resetting the game)
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable the box for new moves
    box.innerText = "";   // Clear the box's content
  }
};

// Function to display the winner message and disable further moves
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Set the winner message using template literal
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes to prevent additional moves
};

// Function to check if any winning pattern is achieved
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get the text values of the boxes in the current winning pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // If none of the boxes are empty and they all contain the same value, declare a winner
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Call function to display the winner
        return true;         // Return true to indicate a win was found
      }
    }
  }
};

// Add event listeners for the new game and reset buttons to restart the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);