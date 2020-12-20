import Templator from './core/templatorV2/index.js';
export const template = `
  <main class="auth">
    <div class="card">
    <input :type="inputType">
      <button @click="onClick">Click me!</button>
      <button>{{ buttonText }}</button>
    </div>
  </main>
`; 

const templator = new Templator(template);

templator.render({
  inputType: 'password',
  buttonText: 'Text!',
  onClick: () => console.log('click!'),
})

console.log(templator);