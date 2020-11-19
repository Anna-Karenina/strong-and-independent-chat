
const inputs = document.querySelectorAll('.field__input');
const inputSetter = (input) => (event) => {
  input.setAttribute('value',  event.target.value);
};

inputs.forEach((input) => input.addEventListener('input', inputSetter(input)));