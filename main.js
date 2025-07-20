// Setting Game Name

let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Mouaz Aljomaat`;

// call this function in loading
window.onload = () => genrateInput();
// Manage Words
let wordToGuess = "";
const words = [
  "apple",
  "ball",
  "cat",
  "dog",
  "fish",
  "bird",
  "car",
  "hat",
  "book",
  "tree",
  "sun",
  "moon",
  "star",
  "rain",
  "cloud",
  "milk",
  "juice",
  "bread",
  "cake",
  "candy",
  "chair",
  "table",
  "bed",
  "shoe",
  "sock",
  "toy",
  "block",
  "cup",
  "plate",
  "spoon",
  "fork",
  "train",
  "truck",
  "bus",
  "boat",
  "house",
  "door",
  "window",
  "light",
  "flower",
  "grass",
  "leaf",
  "mouse",
  "duck",
  "frog",
  "bee",
  "egg",
  "hand",
  "foot",
  "face",
];
wordToGuess = words[Math.floor(Math.random() * words.length)];

// Message Of Win Or Lose
let messageArea = document.querySelector(".message");
let trophy = document.querySelector(".trophy");

// Games setting
numbeOfWords = words.length;
wordsGuessd = 0;
numberOfTries = 7;
numbeOfLetters = wordToGuess.length;
currentTry = 1;
numberOfHints = 2;

function genrateInput() {
  // Genrate the tries and the inputs of letters
  // Set classes to the Tries and inputs
  // Set the Attribure to the inputs so the max length be one
  let inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try${i}</span>`;

    if (i != currentTry) {
      tryDiv.classList.add("disabled-inputs");
    }

    for (let j = 1; j <= numbeOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.classList.add(`try-${i}-letter-${j}`);
      input.setAttribute("maxlength", 1);
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }

  // disable all the inputs not in the currnt try
  const allInputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );

  allInputsInDisabledDiv.forEach((e) => {
    e.disabled = true;
  });

  // Make the Focus on the first input when you enter the page
  inputsContainer.childNodes[0].childNodes[1].focus();

  // Handle the navigation when you write the word
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    const nextInput = inputs[index + 1];
    const backInput = inputs[index - 1];
    input.addEventListener("input", function () {
      // change to upper case when input value change occur
      this.value = this.value.toUpperCase();
      // Navaigate or go the right when Enter the letter
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      if (event.key == "ArrowRight") {
        nextInput.focus();
      }
      if (event.key == "ArrowLeft") {
        backInput.focus();
      }
      if (event.code == "Space") {
        nextInput.focus();
      }

      input.selectionStart = input.selectionEnd = this.value.length;
    });
  });

  // add the hints number to the button
  document.querySelector(".hint span").innerHTML = `( ${numberOfHints} )`;

  // add the number of words have been guessed
  document.querySelector(
    ".Wordbtn"
  ).innerHTML = `${wordsGuessd}/${numbeOfWords}`;
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", () => handleGuesses());
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    handleGuesses();
  }
});

function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numbeOfLetters; i++) {
    const Input = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const valueInInput = Input.value.toLowerCase();
    const valueInWord = wordToGuess[i - 1];

    if (valueInWord === valueInInput) {
      // The letter is correct and on place
      Input.classList.add("in-place");
    } else if (wordToGuess.includes(valueInInput) && valueInInput != "") {
      // The letter correct but not in place
      Input.classList.add("not-in-place");
      successGuess = false;
    } else if (!wordToGuess.includes(valueInInput) && valueInInput != "") {
      // letter is wrong
      Input.classList.add("no");
      successGuess = false;
    } else {
      successGuess = false;
    }
  }

  // Next try if no win
  currentTry++;
  // Swich the disable to the prevous and make the next enable
  const allTries = document.querySelectorAll(".inputs > div");
  allTries.forEach((tryDiv, index) => {
    if (currentTry === index + 1) {
      tryDiv.classList.remove("disabled-inputs");
      tryDiv.childNodes.forEach((e) => (e.disabled = false));

      // focus on the first input
      tryDiv.childNodes[1].focus();
    } else {
      tryDiv.classList.add("disabled-inputs");
      tryDiv.childNodes.forEach((e) => (e.disabled = true));
    }
  });

  if (successGuess) {
    launchConfetti();

    // remove the prevous inputs and genrate the new words
    setTimeout(() => {
      // new game settings
      wordToGuess = words[Math.floor(Math.random() * words.length)];
      wordsGuessd++;
      numbeOfLetters = wordToGuess.length;
      currentTry = 1;
      numberOfHints = 3;
      hintButton.disabled = false;

      const triesDiv = document.querySelectorAll(".inputs > div");
      triesDiv.forEach((e) => {
        e.remove();
      });

      genrateInput();
    }, 2000);

    // handle the wins messages
    if (wordsGuessd === 5) {
      messageArea.innerHTML = `You win the Brons, Keep going!!, You deserve it and keep in mind words may repeat ^_' <span>🥉</span>`;
      trophy.innerHTML = "🥉";
    } else if (wordsGuessd === 10) {
      messageArea.innerHTML = `You win the Silver, OMG Keep it up !!, You deserve it <span>🥈</span>`;
      trophy.innerHTML = "🥉 🥈";
    } else if (wordsGuessd === 20) {
      messageArea.innerHTML = `You win the Gooold!!, No wayy!!  <span>🥇</span>`;
      trophy.innerHTML = "🥉 🥈 🥇";
    } else if (wordsGuessd === 30) {
      messageArea.innerHTML = `You win the Platinum, You are really the king of this game!! <span>💠</span>`;
      trophy.innerHTML = "🥉 🥈 🥇 💠";
    } else if (wordsGuessd === 40) {
      messageArea.innerHTML = `You win the Diamond, elite elite elite you can do it!!! <span>$💎</span>`;
      trophy.innerHTML = "🥉 🥈 🥇 💎";
    } else if (wordsGuessd === 50) {
      messageArea.innerHTML = `You win the Elite, Now we can say, no one can beat youu in this gaaame!!! <span>⚜️</span>`;
      trophy.innerHTML = "🥉 🥈 🥇 💎 ⚜️";
      guessButton.disabled = true;
      hintButton.disabled = true;
    }
  } else {
    if (currentTry > 7) {
      messageArea.innerHTML = `GAME OVER, Try Again!`;
      guessButton.disabled = true;
      hintButton.disabled = true;
    }
  }
}

const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", () => handleHints());

// Bring the random number not duplicated
function handleHints() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = `( ${numberOfHints} )`;
  }
  if (numberOfHints === 0) {
    hintButton.disabled = true;
  }

  // Bring Empty Enabled Input by making it Array And filter it
  const enabledIputs = document.querySelectorAll("input:not([disabled])");
  const EmptyEnabledInputs = Array.from(enabledIputs).filter(
    (input) => input.value === ""
  );

  if (EmptyEnabledInputs.length > 0) {
    const randomNum = Math.floor(Math.random() * EmptyEnabledInputs.length);
    const randomInput = EmptyEnabledInputs[randomNum];
    const IndexInputToFill = Array.from(enabledIputs).indexOf(randomInput);

    if (IndexInputToFill !== -1 && numberOfHints !== 0) {
      randomInput.value = wordToGuess[IndexInputToFill].toUpperCase();
    }
  }
}

// When win Do This Function
function launchConfetti() {
  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position and color
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = Math.random() * 8 + 4 + "px";
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = Math.random() * 2.5 + 2.5 + "s";

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

function getRandomColor() {
  const colors = [
    "#e74c3c",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#e67e22",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
