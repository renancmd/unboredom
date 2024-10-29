import Term from "./Term.js";

function runTerm() {
  const title = document.getElementById("title");
  const otherGameButton = document.getElementById("otherGameButton");
  const displays = document.querySelectorAll(".display");

  title.addEventListener("click", () => window.location.href = "/index.html");
  otherGameButton.addEventListener("click", () => window.location.href = "/index.html");

  const term = new Term(displays);
  // term.print();
  term.boxClick();
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
