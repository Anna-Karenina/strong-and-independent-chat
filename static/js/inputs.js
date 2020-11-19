const inputSetter = (input) => (event) => {
  input.setAttribute('value',  event.target.value);
};

export const inputBind = (...selectots) => selectots
  .reduce((acc, selector) => [ ...acc, ...document.querySelectorAll(selector) ], [])
  .forEach((input) => input.addEventListener('input', inputSetter(input)));

export const inputAgregate = (...selectots) => selectots
  .reduce((acc, selector) => [ ...acc, ...document.querySelectorAll(selector) ], [])
  .reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});