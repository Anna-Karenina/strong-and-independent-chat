
import { inputBind, inputAgregate } from '../js/inputs.js';

inputBind('.field__input');

const submit = document.querySelector('.signin__primary-button');

submit.addEventListener('click', () => {
  const inputsData = inputAgregate('.field__input');
  console.log(inputsData);
});