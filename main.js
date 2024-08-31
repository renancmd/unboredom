function termGame() {
    function checkLenght(response) {
        response.forEach(v => {
            if (v == '') {
                console.log('Precisa de 5 letras');
                return;
            }
        });
    }

    function checkResponse(word, response, display) {
        for (let i = 0; i < 5; i++) {
            if (word[i] == response[i]) {
                display[i].value = response[i];
                
            }
        }
    }

    const words = [
        "carro", "cesta", "livro", "porta", "fruta", "folha", "papel", "lápis",
        "cinto", "treno", "canal", "pedra", "renda", "tigre", "praia", "vento",
        "luvas", "faixa", "cerve", "salto", "nuvem", "linha", "luzia", "dente",
        "lente", "mapas", "creme", "farol", "vento", "verde", "couro", "medal",
        "banco", "quero", "posto", "cerne", "pecas", "fundo", "vezes", "salva",
        "torre", "corda", "lapso", "flore", "campo", "texto", "pente", "gripe"
    ];
    let index = Math.floor(Math.random() * 50);
    let word = words[index].split('');

    let display = document.querySelectorAll(".letter");
    let letters = document.querySelectorAll('.user-letter');
    let response = [];
    const test = document.querySelector('h1');
    
    test.addEventListener('click', () => {
        letters.forEach((v, i) => {
            response[i] = v.value;
        });
        
        checkLenght(response);
        checkResponse(word, response, display);
        
        
    });
    
}

function main() {
    termGame();
}

main();