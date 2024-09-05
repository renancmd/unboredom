class Term {
    constructor(letters, boxes, displayLetters) {
        this.letters = letters;
        this.boxes = boxes;
        this.displayLetters = displayLetters;

        this.words = [
            "carro", "cesta", "livro", "porta", "fruta", "folha", "papel", "lápis",
            "cinto", "treno", "canal", "pedra", "renda", "tigre", "praia", "vento",
            "luvas", "faixa", "cerve", "salto", "nuvem", "linha", "luzia", "dente",
            "lente", "mapas", "creme", "farol", "vento", "verde", "couro", "medal",
            "banco", "quero", "posto", "cerne", "pecas", "fundo", "vezes", "salva",
            "torre", "corda", "lapso", "flore", "campo", "texto", "pente", "gripe"
        ];
        this.index = Math.floor(Math.random() * 49);
        this.word = this.words[this.index];
    }

    // Methods
    isFocus(index) {
        this.boxes[index].style.borderBottom = '10px solid #3E3E3E';
    }

    isString(e) {
        const strs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < strs.length; i++) {
            if (e.key === strs[i]) {
                let index = this.checkFocus();
                this.letters[index].innerText = e.key
                this.nextBox();


            }
        }
    }

    removeBoxResponse() {
        let index = this.checkFocus();

            if (this.letters[index].innerText !== '') {
                this.removeString();
            } else if (this.letters[index].innerText == '') {
                this.previousBox();
                this.removeString();
            }
    }

    isBoxesFill() {
        let response = '';
        this.letters.forEach((v, i) => {
            if (v.innerText === '') {
                response = false;
            }

            if (v.innerText != '') {
                response += v.innerText;
            }
        });

        return response;

    }

    checkWordResponse() {
        let response = this.isBoxesFill();

        if (response != false) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === response[i]) {
                    this.displayLetters[i].innerText = response[i]
                }
            }
        }
    }

    checkFocus() {
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].style.borderBottomWidth === '10px') {
                return i;
            }
        }
    }

    removeFocus(index) {
        this.boxes[index].style.borderBottom = '';
    }

    removeString() {
        let index = this.checkFocus();

            if (this.letters[index].innerText != '') {
                this.letters[index].innerText = '';
            }
    }

    nextBox() {
        let index = this.checkFocus();
        let nextIndex = index + 1;

        this.removeFocus(index);

        if (nextIndex > 4) {
            this.isFocus(4);
        } else if (nextIndex < 5) {
            this.isFocus(nextIndex);
        }
    }

    previousBox() {
        let index = this.checkFocus();
        let previousIndex = index - 1;

        this.removeFocus(index);

        if (previousIndex < 0) {
            this.isFocus(0);
        } else if (previousIndex < 5) {
            this.isFocus(previousIndex);
        }
    }

    isWin() {
        let response = this.isBoxesFill();
        
        if (response === this.word) {
            console.log('you win');
            
        }
    }

    restart() {
        location.reload();
    }

    pressArrowRight(e) {
        if (e.key === 'ArrowRight') {
            this.nextBox();
        }
    }

    pressArrowLeft(e) {
        if (e.key === 'ArrowLeft') {
            this.previousBox();
        }
    }

    pressBackspace(e) {
        if (e.key === 'Backspace') {
            this.removeBoxResponse();
            
        }
    }

    pressEnter(e) {
        if (e.key === 'Enter') {
            this.checkWordResponse();
            this.isWin();

        }
    }

    clickBox(newFocus) {
        let index = this.checkFocus();
        this.removeFocus(index);
        this.isFocus(newFocus);
    }

}

export default Term;