// Habilitar ou desabilitar o botão
const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  // Permite apenas letras no valor inserido
  const value = target.value.replace(/[^a-zA-Z]/g, '');
  
  // Corrige o texto para começar com a primeira letra maiúscula e o resto em minúsculas
  const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  target.value = formattedValue;

  // Habilita ou desabilita o botão
  if (target.value.length > 2) {
    button.removeAttribute('disabled'); // Habilita o botão
  } else {
    button.setAttribute('disabled', 'true'); // Desabilita o botão
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
};

form.addEventListener('submit', handleSubmit);
input.addEventListener('input', validateInput);
