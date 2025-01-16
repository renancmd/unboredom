import Term from "./Term.js";

function main() {
  const displays = document.getElementById("container-displays").getElementsByClassName("display");
  const boxes = document.querySelectorAll(".box");
  const term = new Term(displays, boxes);
  clickEvent();
}

function clickEvent() {
  const title = document.getElementById("title");
  const otherGameButton = document.getElementById("otherGameButton");
  
  title.addEventListener("click", () => window.location.href = "/index.html");
  otherGameButton.addEventListener("click", () => window.location.href = "/index.html");
}

main();
