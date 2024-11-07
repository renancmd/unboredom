import Term from "./Term.js";

function runTerm() {
  const title = document.getElementById("title");
  const otherGameButton = document.getElementById("otherGameButton");
  const displays = document.querySelectorAll(".display");

  title.addEventListener("click", () => window.location.href = "/index.html");
  otherGameButton.addEventListener("click", () => window.location.href = "/index.html");

  const term = new Term(displays);
  const words = ["carro", "abaco", "bebem", "folha", "melão", "piano", "nuvem", "sonho", "velho", "festa"];
  term.guessWord(words);
  term.print();
  term.boxFocus(0, 0);
  term.boxClick();
  document.addEventListener("keydown", e => {
    term.addLetter(e.key);

  });
  document.addEventListener("keydown", e => {
    if (e.key == "Backspace") {
      term.removeLetter();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key == "ArrowLeft") {
      term.previousBox();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key == "ArrowRight") {
      term.nextBox();
    }
  });
}
runTerm();
