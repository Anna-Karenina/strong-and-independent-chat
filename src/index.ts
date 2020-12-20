import Templator, {render} from './core/templatorV2/index.js';
import Component from './core/componentV2/index.js';

interface IMyButtonProps {
  text: string,
};

const buttonTemplate = `<button>{{ text }}</button>`;
const buttonTemplator = Templator.compile(buttonTemplate);
class MyButton extends Component {
  constructor(props: IMyButtonProps) {
    super(props);
  }

  render() {
    return buttonTemplator(this.props);
  }
}

const testTemplate = `
  <main class="auth">
    <div class="card">
    <input :type="inputType">
      <button @click="onClick">Click me!</button>
      <my-button :text="buttonText" />
    </div>
  </main>
`;

const testTemplator = Templator.compile(testTemplate, {
  components: {
    'my-button': MyButton,
  }
});

interface ITestProps {
  inputType: string,
  buttonText: string,
  onClick: Function,
};
class Test extends Component {
  constructor(props: ITestProps) {
    super(props);
  }

  render() {
    return testTemplator(this.props);
  }
}

const test = new Test({
  inputType: 'password',
  buttonText: 'Text!',
  onClick: () => console.log('click!'),
});

console.log(test);
render('#app', test);