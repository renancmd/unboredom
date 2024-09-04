import Term from "./Term.js";

function main() {
    const letters = document.querySelectorAll('.letter');
    const boxes = document.querySelectorAll('.box-user-letter');

    const term = new Term(letters, boxes);
    term.isFocus(0);

    document.addEventListener('keydown', e => {
        term.pressArrowRight(e);
        term.pressArrowLeft(e);
        term.pressBackspace(e);
        term.isString(e);
        term.pressEnter(e);
    });

    boxes.forEach((v, i) => {
        v.addEventListener('click', e => {
            term.clickBox(i);
        });
    });
    
}

main();