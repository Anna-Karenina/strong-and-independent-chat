import Component from '/core/Component/Component.js';
import Templator from '/core/templator/index.js'
import { template } from './field.template.js';

export default class Field extends Component {
  constructor(props) {
    super(props);
  }

  inputHandler(e) {
    e.target.setAttribute('value', e.target.value);
  };

  componentDidMount() {
    this._templator = new Templator(template);
  }

  render() {
    return this._templator.render({
      ...this.props,
      inputHandler: this.inputHandler,
    });
  }
}