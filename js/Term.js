import { data } from "../words_data.js";

class Term {
  constructor(displays, boxes) {
    this.displays = displays;
    this.boxes = boxes;
    this.secretWord = this.chosenSecretWord();
    this.currentRow = 0;
    this.currentCol = 0;
    this.modal = document.getElementById("modal");
    this.modalTitle = document.getElementById("modal-title");
    this.modalText = document.getElementById("modal-text");
    this.repeatButton = document.getElementById("repeatButton");
    this.backButton = document.getElementById("backButton");
    this.init();
  }

  init() {
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
    console.log(this.secretWord);
    this.repeatButton.addEventListener("click", () => this.restartGame());
    this.backButton.addEventListener("click", () => window.location.href = "/index.html");
    this.addBoxClickListeners();
    this.updateBoxFocus();
  }

  randomWord() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  chosenSecretWord() {
    let word = this.randomWord();

    if (word.length === 5) {
      return word;
    } else {
      return this.chosenSecretWord();
    }

  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.gameOver(this.checkGuess());
    } else if (e.key === "Backspace") {
      this.removeLetter();
    } else if (e.key === "ArrowRight") {
      this.moveRight();
    } else if (e.key === "ArrowLeft") {
      this.moveLeft();
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      this.addLetter(e.key);
    }
  }

  addLetter(letter) {
    if (this.currentCol < 5) {
      const box = this.displays[this.currentRow].children[this.currentCol];
      box.textContent = letter;
      this.currentCol++;
      this.updateBoxFocus();
    }
  }

  removeLetter() {
    if (this.currentCol > 0) {
      this.currentCol--;
    }
    const box = this.displays[this.currentRow].children[this.currentCol];
    if (box && box.textContent !== "") {
      box.textContent = "";
    }
    this.updateBoxFocus();
  }

  moveRight() {
    if (this.currentCol < 5) {
      this.currentCol++;
      this.updateBoxFocus();
    }
  }

  moveLeft() {
    if (this.currentCol > 0) {
      this.currentCol--;
      this.updateBoxFocus();
    }
  }

  updateBoxFocus() {
    if (!this.displays[this.currentRow]) return; // Add this line to check if the current row exists
    for (let i = 0; i < 5; i++) {
      const box = this.displays[this.currentRow].children[i];
      if (i === this.currentCol) {
        box.classList.add("focused");
        box.classList.remove("unfocused");
      } else {
        box.classList.add("unfocused");
        box.classList.remove("focused");
      }
    }
  }

  gameOver(result) {
    if (result.every(color => color === 'green')) {
      this.showModal("Você ganhou!", `A palavra secreta era ${this.secretWord}`);
      return;
    }

    if (this.currentRow == 6) {
      this.showModal("Game over!", `A palavra secreta era ${this.secretWord}`);
    }
  }

  showModal(title, text) {
    this.modalTitle.textContent = title;
    this.modalText.textContent = text;
    this.modal.classList.remove("hidden");
  }

  restartGame() {
    window.location.reload();
  }

  checkGuess() {
    if (this.currentCol === 5) {
      const guess = Array.from(this.displays[this.currentRow].children).map(box => box.textContent).join("");
      const result = this.checkGuessResult(guess, this.secretWord);
      this.colorBoxes(result);
      this.currentRow++;
      this.currentCol = 0;
      this.updateBoxFocus(); // Add this line to update the focus
      return result;
    }
  }

  checkGuessResult(guess, secret) {
    const result = [];
    const secretLetters = secret.split('');
    const guessLetters = guess.split('');

    guessLetters.forEach((letter, index) => {
      if (letter === secretLetters[index]) {
        result[index] = 'green';
        secretLetters[index] = null;
      } else {
        result[index] = 'grey';
      }
    });

    guessLetters.forEach((letter, index) => {
      if (result[index] === 'grey' && secretLetters.includes(letter)) {
        result[index] = 'yellow';
        secretLetters[secretLetters.indexOf(letter)] = null;
      }
    });

    return result;
  }

  colorBoxes(result) {
    for (let i = 0; i < 5; i++) {
      const box = this.displays[this.currentRow].children[i];
      if (result[i] === 'green') {
        box.style.backgroundColor = "green";
      } else if (result[i] === 'yellow') {
        box.style.backgroundColor = "blue";
      } else {
        box.style.backgroundColor = "";
      }
    }
  }

  addBoxClickListeners() {
    for (let row = 0; row < this.displays.length; row++) {
      for (let col = 0; col < this.displays[row].children.length; col++) {
        const box = this.displays[row].children[col];
        box.addEventListener("click", () => this.handleBoxClick(row, col));
      }
    }
  }

  handleBoxClick(row, col) {
    if (row === this.currentRow) {
      this.currentCol = col;
      this.updateBoxFocus();
    }
  }
}

export default Term;