// Letters to guess
const letters = "abcdefghijklmnopqrstuvwxyz";

//  Get Array From Letters
let lettersArray = Array.from(letters);
// Get Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Add Class To Span
  span.className = "letter-box";
  // Create Text Node
  let theLetter = document.createTextNode(letter);
  // Append The Letter To The Span
  span.appendChild(theLetter);
  // Append The Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// console.log(words["movies"]);
// Get Random Property
let allKeys = Object.keys(words);
// console.log(allKeys);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// console.log(randomPropNumber);
let randomPropName = allKeys[randomPropNumber];
// console.log(randomPropName);
let randomPropValue = words[randomPropName];
// console.log(randomPropValue);
/// Get Random Value From The Random Property
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// console.log(randomValueNumber);
let randomValueValue = randomPropValue[randomValueNumber];
// console.log(randomValueValue);

// Set Category Info
document.querySelector(".category span").innerHTML = randomPropName;
// Get Letters Guess Container
let lettersGuessContainer = document.querySelector(".letters-guess");
// Create Array From Word
let lettersAndSpace = Array.from(randomValueValue);
// console.log(lettersAndSpace);

// Create Spans Depended On Word

lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
console.log(randomValueValue);

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;
  // Set Status
  if (e.target.className == "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    // Get Array Of The Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span");
    // Set The Choose Status

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();

      // Check if player won
      checkWin();
    }
  }
});

// Function to check if player won
function checkWin() {
  let guessSpans = document.querySelectorAll(".letters-guess span");
  let theChosenWord = Array.from(randomValueValue.toLowerCase());
  let winStatus = true;

  theChosenWord.forEach((wordLetter, WordIndex) => {
    if (guessSpans[WordIndex].innerHTML !== wordLetter) {
      winStatus = false;
    }
  });

  if (winStatus) {
    Winningstate();
    lettersContainer.classList.add("finished");
  }
}

// End Game Function
function endGame() {
  // Create Pop Up
  let div = document.createElement("div");
  div.className = "popup";
  div.innerHTML = `
    <div>Game Over, The Word Is ${randomValueValue}</div>
    <button onclick="playAgain()" style="
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 18px;
      background-color: #e91e63;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    ">Play Again</button>
  `;
  document.body.appendChild(div);
}

function Winningstate() {
  // Create Pop Up
  let div = document.createElement("div");
  div.className = "popup";
  div.innerHTML = `
    <div>You Won, The Word Is ${randomValueValue}</div>
    <button onclick="playAgain()" style="
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 18px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    ">Play Again</button>
  `;
  document.body.appendChild(div);
}

// Play Again Function
function playAgain() {
  // Remove popup
  document.querySelector(".popup").remove();

  // Reset wrong attempts
  wrongAttempts = 0;

  // Remove all wrong classes from draw
  theDraw.className = "hangman-draw";
  lettersContainer.classList.remove("finished");
  document.querySelectorAll(".letter-box").forEach((letter) => {
    letter.classList.remove("clicked");
  });
  document.querySelectorAll(".letters-guess span").forEach((span) => {
    span.innerHTML = "";
  });

  let randomPropNumber = Math.floor(Math.random() * allKeys.length);
  let randomPropName = allKeys[randomPropNumber];
  let randomPropValue = words[randomPropName];
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  randomValueValue = randomPropValue[randomValueNumber];

  document.querySelector(".category span").innerHTML = randomPropName;

  let lettersGuessContainer = document.querySelector(".letters-guess");
  lettersGuessContainer.innerHTML = "";
  let lettersAndSpace = Array.from(randomValueValue);

  lettersAndSpace.forEach((letter) => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
      emptySpan.className = "with-space";
    }
    lettersGuessContainer.appendChild(emptySpan);
  });
}
