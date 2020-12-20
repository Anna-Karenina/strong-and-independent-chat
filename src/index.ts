import Templator, {render} from './core/templatorV2/index.js';
import Component from './core/componentV2/index.js';

interface IMyButtonProps {
  text: string,
  onClick?: Function,
};

const buttonTemplate = `<button @click="onClick">{{ text }}</button>`;
const buttonTemplator = Templator.compile(buttonTemplate);
class MyButton extends Component {
  constructor(props: IMyButtonProps) {
    super(props);
  }

  render() {
    const {
      onClick = () => {},
      text,
    } = this.props;

    return buttonTemplator({text, onClick});
  }
}

const testTemplate = `
  <div class="parent">
    <div class="card" $each="card in cards">
      <h3>{{ card.title }}</h3>
      <my-button :text="card.button" :onClick="card.onClick" />
    </div>
  </div>
`;

const testTemplator = Templator.compile(testTemplate, {
  components: {
    'my-button': MyButton,
  }
});

interface ITestProps {
  cards: {title: string, button: string, onClick: Function} [];
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
  cards: [
    {title: 'Title 1', button: 'button text 1', onClick: () => console.log('1')},
    {title: 'Title 2', button: 'button text 2', onClick: () => console.log('2')},
    {title: 'Title 3', button: 'button text 3', onClick: () => console.log('3')},
  ]
});

console.log(test);
render('#app', test);

setTimeout(() => {
  test.setProps({
    cards: [
      {title: 'Title 1', button: 'button text 1', onClick: () => console.log('1')},
    ],
  });
}, 3000);

setTimeout(() => {
  test.setProps({
    cards: [
      {title: 'Title 1', button: 'button text 1', onClick: () => console.log('1')},
      {title: 'Title 2', button: 'button text 2', onClick: () => console.log('2')},
      {title: 'Title 3', button: 'button text 3', onClick: () => console.log('3')},
      {title: 'Title 4', button: 'button text 4', onClick: () => console.log('4')},
      {title: 'Title 5', button: 'button text 5', onClick: () => console.log('5')},
    ],
  });
}, 5000);
