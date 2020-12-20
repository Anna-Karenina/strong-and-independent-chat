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
      <input :type="inputType" :value="value">
      <h2>{{ title }}</h2>
      <button @click="onClick">Click me!</button>
      <my-button :text="buttonText" />
      <my-button :text="secondButtonText" />
    </div>
  </main>
`;

const testTemplator = Templator.compile(testTemplate, {
  components: {
    'my-button': MyButton,
  }
});

interface ITestProps {
  title: string,
  value: string,
  inputType: string,
  buttonText: string,
  secondButtonText: string,
  onClick: Function,
};
class Test extends Component {
  constructor(props: ITestProps) {
    super(props);
  }

  render() {
    const vDom = testTemplator(this.props);
    console.log(vDom);
    return vDom
  }
}

const test = new Test({
  title: 'Title',
  value: '',
  inputType: 'password',
  buttonText: 'Text!',
  secondButtonText: 'secondButtonText!',
  onClick: () => console.log('click!'),
});

console.log(test);
render('#app', test);

setTimeout(() => {
  test.setProps({ title: 'MEGA NEW TITLE', value: 'input value :)', onClick: () => console.log('other click!'), });
}, 3000)