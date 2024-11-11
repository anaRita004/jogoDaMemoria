const grade = document.querySelector('.grade');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Lista de pares de lixeiras e seus materiais correspondentes
const pares = [
    { lixeira: 'Vermelho', material: 'Plástico' },
    { lixeira: 'Azul', material: 'Papel' },
    { lixeira: 'Amarelo', material: 'Metal' },
    { lixeira: 'Verde', material: 'Vidro' },
    { lixeira: 'Marrom', material: 'Orgânico' },
    { lixeira: 'Preto', material: 'Madeira' },
    { lixeira: 'Branco', material: 'Saúde' },
    { lixeira: 'Cinza', material: 'NãoReciclável' },
    { lixeira: 'Laranja', material: 'Perigosos' },
    { lixeira: 'Roxo', material: 'Radioativos' }
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCarta = '';
let secondCarta = '';
let lockBoard = false; 
let timerInterval; // Variável para armazenar o setInterval do timer
let seconds = 0;   // Contador de segundos

// Função para verificar se o jogo acabou
const checkEndGame = () => {
    const disabledCartas = document.querySelectorAll('.disabled-carta');

    if (disabledCartas.length === 20) {
        clearInterval(timerInterval);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

// Função para verificar se as cartas viradas formam um par
const checkCartas = () => {
    const firstLixeira = firstCarta.getAttribute('data-lixeira');
    const firstIsLixeira = firstCarta.getAttribute('data-isLixeira') === 'true';
    const secondLixeira = secondCarta.getAttribute('data-lixeira');
    const secondIsLixeira = secondCarta.getAttribute('data-isLixeira') === 'true';

    if (firstLixeira === secondLixeira && firstIsLixeira !== secondIsLixeira) {
        firstCarta.firstChild.classList.add('disabled-carta');
        secondCarta.firstChild.classList.add('disabled-carta');
        firstCarta = '';
        secondCarta = '';
        lockBoard = false;

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCarta.classList.remove('reveal-carta');
            secondCarta.classList.remove('reveal-carta');
            firstCarta = '';
            secondCarta = '';
            lockBoard = false;
        }, 700);
    }
}

// Função para revelar as cartas
const revealCarta = ({ target }) => {
    if (lockBoard || target.parentNode.className.includes('reveal-carta')) {
        return;
    }

    target.parentNode.classList.add('reveal-carta');

    if (firstCarta === '') {
        firstCarta = target.parentNode;
    } else if (secondCarta === '') {
        secondCarta = target.parentNode;
        lockBoard = true;
        checkCartas();
    }
}

// Função para criar uma carta com frente e verso
const createCarta = (lixeira, material, isLixeira) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'face frente');
    const tras = createElement('div', 'face tras');

    frente.style.backgroundImage = isLixeira 
        ? `url('../imagens/${lixeira}.png')` 
        : `url('../imagens/${material}.png')`;

    carta.appendChild(frente);
    carta.appendChild(tras);

    carta.addEventListener('click', revealCarta);
    carta.setAttribute('data-lixeira', lixeira);
    carta.setAttribute('data-isLixeira', isLixeira);

    return carta;
}

// Função para embaralhar as cartas
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para carregar o jogo
const loadGame = () => {
    const duplicatelixeiras = pares.flatMap(({ lixeira, material }) => [
        { lixeira, material, isLixeira: true },
        { lixeira, material, isLixeira: false }
    ]);

    const shuffledArray = shuffleArray(duplicatelixeiras);
    console.log('Carregando o jogo...');

    grade.innerHTML = '';

    shuffledArray.forEach(({ lixeira, material, isLixeira }) => {
        const carta = createCarta(lixeira, material, isLixeira);
        grade.appendChild(carta);
    });
};

// Função para iniciar o timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        seconds += 1;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // Formata o tempo como mm:ss
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player') || "Jogador"; // Definir um valor padrão caso não tenha nome
    loadGame();
    startTimer(); // Iniciar o timer assim que o jogo carregar
}
