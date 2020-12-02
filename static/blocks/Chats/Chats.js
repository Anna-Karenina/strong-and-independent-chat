import Component from '/core/component/index.js';
import Templator from '/core/templator/index.js';
import MyButton from '/components/MyButton/index.js';
import Field from '/components/Field/index.js';
import { chatsTemplate } from './chats.template.js';

export default class Chats extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._templator = new Templator(chatsTemplate, {
      components: {
        'my-button': MyButton,
        'field': Field,
      },
    });
  }

  render() {
    return this._templator.render(this.props);
  }
};