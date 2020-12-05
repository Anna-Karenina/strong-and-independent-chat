import Component, { IProps } from '../../core/Component/Component.js';
import Templator from '../../core/templator/index.js'
import { template } from './field.template.js';

export default class Field extends Component {
  private _templator: Templator;

  constructor(props: IProps) {
    super(props);
  }

  inputHandler(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    target.setAttribute('value', target.value);
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