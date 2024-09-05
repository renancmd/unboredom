import Term from './Term.js';

function runTerm() {
    const title = document.getElementById('title');
    const otherGameButton = document.getElementById('otherGameButton');
    const displayLetters = document.querySelectorAll('.display-letter')
    const letters = document.querySelectorAll('.letter');
    const boxes = document.querySelectorAll('.box-user-letter');
    const restartButton = document.querySelector('.restart-button');

    const term = new Term(letters, boxes, displayLetters);

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

    restartButton.addEventListener('click', () => {
        term.restart();
    });

    title.addEventListener('click', () => {
        window.location.href = './index.html'
    })

    otherGameButton.addEventListener('click', () => {
        window.location.href = './index.html'
    })
}

runTerm();