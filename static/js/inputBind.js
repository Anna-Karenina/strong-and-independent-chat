const inputSetter = (input) => (event) => {
  input.setAttribute('value',  event.target.value);
};

export const inputBind = (...selectots) => selectots
  .reduce((acc, selector) => [ ...acc, ...document.querySelectorAll(selector) ], [])
  .forEach((input) => input.addEventListener('input', inputSetter(input)));
