// TODO :
/*
 [X] Create Random Words Arr  
 [X] Randomly Choose Word 
 [X] shuffle the word
 [X] Create boxes(word.length) and put them in option boxes
 [X] Assign Event Listener to it
 [X] Put clicked word into first empty box in guess boxes
 [X] Clear that clicked element from option boxes
 [X] Also Create empty boxes(word.length) and put them in guess boxes
 [X] Add Event Listener to Delete Button
  [X] remove that element from userGuess box
  [X] add taht element to its approapriate position in option box


 [X] Once User Guessed All the Word Check if right turn all word into green else turn all elements into red 
*/

// *---------------------------------------------- DOM Element Selection -----------------------------------------------------------------------* //
const optionBox = document.querySelector(".option-box");
const guessBox = document.querySelector(".guess-box");
const winOverlay = document.querySelector(".win-overlay");
const nextLevelPlaceholder = document.querySelector(".win-overlay__next");
const loseOverlay = document.querySelector(".lose-overlay");
const levelPlaceholder = document.querySelector(".header__level-no");

// *---------------------------------------------- Global Variables -----------------------------------------------------------------------* //

let words = [
  "Rehan",
  "Aadil",
  "Zaid",
  "Moin",
  "Matin",
  "Nabil",
  "Riyaz",
  "Kulsum",
  "Programmer",
  "Coder",
  "JavaScript",
  "CSS",
];

let randomWord;
let randomWordArr;
let randomWordArrCopy;
let userGuessedWordArr;
let level = 1;

// *---------------------------------------------- Functions  -----------------------------------------------------------------------* //

function shuffleArr(arr, times, arrCopy) {
  if (times !== arr.length) {
    let firstRandomNum =
      randomWordArr[Math.trunc(Math.random() * randomWordArr.length)];
    let secondRandomNum =
      randomWordArr[Math.trunc(Math.random() * randomWordArr.length)];

    [arr[arr.indexOf(firstRandomNum)], arr[arr.indexOf(secondRandomNum)]] = [
      arr[arr.indexOf(secondRandomNum)],
      arr[arr.indexOf(firstRandomNum)],
    ];

    times++;

    JSON.stringify(randomWordArr) === JSON.stringify(arrCopy)
      ? shuffleArr(randomWordArr, 0, randomWordArrCopy)
      : shuffleArr(randomWordArr, times, randomWordArrCopy);
  }

  return arr;
}

function createBoxes() {
  for (let i = 0; i < randomWordArr.length; i++) {
    let boxOfOption = document.createElement("div");
    boxOfOption.classList.add("option-box__word");
    boxOfOption.id = `option-box__word--${i + 1}`;
    boxOfOption.innerText = randomWordArr[i];
    optionBox.appendChild(boxOfOption);

    let boxOfGuess = document.createElement("div");
    boxOfGuess.classList.add(`guess-box__empty`);
    boxOfGuess.classList.add(`guess-box__word--${i + 1}`);
    boxOfGuess.innerHTML = `<span class="guess-box__word--delete">x</span>`;
    guessBox.appendChild(boxOfGuess);
  }
}

const addGuessedWord = (e) => {
  if (e.target.classList.contains("option-box__word")) {
    let userGuessedElement = e.target;
    let userID = userGuessedElement.id;
    let userGuessedWord = userGuessedElement.textContent;

    // Push User Guessed Word to User Guessed Word Arr;
    userGuessedWordArr[userGuessedWordArr.indexOf(null)] = userGuessedWord;

    // Removing Content and Classes
    userGuessedElement.classList.remove("option-box__word");
    userGuessedElement.classList.add("option-box__empty");

    userGuessedElement.textContent = "";

    let firstEmptyCell = document.querySelector(".guess-box__empty");

    // Modifying Inner HTML
    firstEmptyCell.innerHTML = "";
    firstEmptyCell.innerHTML = `<span class="guess-box__word--delete ">x</span> ${userGuessedWord}`;

    // Removing Classes
    firstEmptyCell.classList.remove("guess-box__empty");
    firstEmptyCell.classList.add("guess-box__word");

    // Setting IDs
    firstEmptyCell.id = userID;

    // Checking If User Submitted  Guess
    !userGuessedWordArr.filter((value) => !value).length
      ? userGuessedWordArr.join("") === randomWordArrCopy.join("")
        ? winOrLose(true)
        : winOrLose(false)
      : "";
  }
};

const removeGuessedWord = (e) => {
  if (e.target.classList.contains("guess-box__word--delete")) {
    let userDeletedElement = e.target.parentElement;
    let userDeletedElementId = userDeletedElement.id;
    let userDeletedWordIdx =
      Number(userDeletedElement.classList[0].split("--")[1]) - 1;

    // Deleting Word From User Guessed Word Arr
    userGuessedWordArr.splice(userDeletedWordIdx, 1, null);

    userDeletedElement.classList.remove("guess-box__word");
    userDeletedElement.id = "";

    userDeletedElement.innerHTML = "";
    userDeletedElement.classList.add("guess-box__empty");

    resetGuessedWord(userDeletedElementId);
  }
};

const resetGuessedWord = (id) => {
  let position = optionBox.querySelector(`#${id}`);
  position.classList.remove("option-box__empty");
  position.classList.add("option-box__word");
  position.textContent = randomWordArr[Number(id.split("--")[1]) - 1];
};

const winOrLose = (condition) => {
  if (condition) {
    winOverlay.classList.remove("u-hidden");
    winOverlay.classList.add("u-visible");

    nextLevelPlaceholder.addEventListener("click", () => {
      nextLevel(randomWord);
    });
  } else {
    Array.prototype.forEach.call(
      guessBox.children,
      (element) => (element.style.backgroundColor = "#a30101")
    );

    setTimeout(() => {
      loseOverlay.classList.remove("u-hidden");
      loseOverlay.classList.add("u-visible");
    }, 1500);
  }
};

const nextLevel = (word) => {
  //Showing Winning Overlay
  winOverlay.classList.remove("u-visible");
  winOverlay.classList.add("u-hidden");

  // Increasing Level
  level++;

  //Deleting Completed Word from Words
  words.splice(words.indexOf(word), 1);

  //Go to Inital Stage with Modified Changes
  init();
};

const init = () => {
  //Declaring INitial Global Variables
  randomWord = words[Math.trunc(Math.random() * words.length)];
  randomWordArr = randomWord.split("");
  randomWordArrCopy = [...randomWordArr];
  userGuessedWordArr = Array(randomWordArr.length).fill(null);
  levelPlaceholder.textContent = level;
  randomWordArr = shuffleArr(randomWordArr, 0, randomWordArrCopy);

  //Clearing InneHTML of DOM
  optionBox.innerHTML = "";
  guessBox.innerHTML = "";

  //Creating Empty boxes
  createBoxes();

  //Adding Event Listeners

  optionBox.addEventListener("click", addGuessedWord);
  guessBox.addEventListener("click", removeGuessedWord);
};

init();

// *---------------------------------------------- Event Handlers  -----------------------------------------------------------------------* //
