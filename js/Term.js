class Term {
  constructor(display) {
    this.display = display;
  }

  whichDisplay() {  // Return the current display index
    let index;

    for (let i = 0; i < this.display.length; i++) {
      for (let j = 0; j < this.display[i].children.length; j++) {
        if (this.display[i].children[j].innerText == "") {
          index = i;
          i = this.display.length - 1;
          j = this.display[i].children.length - 1;
        }
      }
    }

    return index;
  }

  whichBox () { // Return the current box index
    let currentDisplay = this.whichDisplay();

    for (let i = 0; i < this.display[currentDisplay].children.length; i++) {
      if (this.display[currentDisplay].children[i].style.borderBottom == "8px solid rgb(62, 62, 62)") {
        return i;
        i = this.display[currentDisplay].children.length - 1;
      }
    }
  }

  boxFocus(displayIndex, boxIndex) { // Style the box which is focused
    this.display[displayIndex].children[boxIndex].style.borderBottom = "8px solid #3e3e3e";
  }

  boxUnfocus(displayIndex) { // Unstyle the box which's focused
    for (let j = 0; j < this.display[displayIndex].children.length; j++) {
      this.display[displayIndex].children[j].style.borderBottom = "5px solid #3e3e3e";
    }
  }

  boxClick() { // Select the box clicked by the user
    let displayIndex = this.whichDisplay();

    for (let i = 0; i < this.display[displayIndex].children.length; i++) {
      this.display[displayIndex].children[i].addEventListener("click", () => {
        this.boxUnfocus(displayIndex);
        this.boxFocus(displayIndex, i);
      });
    }
  }

  nextBox() { // Go to the next focused box
    let currentDisplay = this.whichDisplay();
    let currentBox = this.whichBox();

    this.boxUnfocus(currentDisplay);

    if (currentBox < this.display[currentDisplay].children.length - 1) {
      this.boxFocus(currentDisplay, currentBox + 1);
    } else if (currentBox == this.display[currentDisplay].children.length - 1) {
      this.boxFocus(currentDisplay, currentBox);
    }
  }

  previousBox() { // Go to the previous focused box
    let currentDisplay = this.whichDisplay();
    let currentBox = this.whichBox();

    this.boxUnfocus(currentDisplay);

    if (currentBox > 0 && currentBox <= this.display[currentDisplay].children.length - 1) {
      this.boxFocus(currentDisplay, currentBox - 1);
    } else if (currentBox == 0) {
      this.boxFocus(currentDisplay, 0);
    }
  }

  // print() {
  //   console.log(this.whichBox());
  // }
}

export default Term;
