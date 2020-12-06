import Component from '../../core/Component/index.js';
import Templator from '../../core/templator/index.js'
import { template } from './field.template.js';

interface IFieldProps {
  onBlur?: (e: Event) => any,
  error?: string | null,
};
export default class Field extends Component {
  private templator: Templator;

  constructor(props: IFieldProps) {
    super(props);
  }

  inputHandler(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    target.setAttribute('value', target.value);
  };

  componentDidMount() {
    this.templator = new Templator(template);
  }

  render() {
    const errorClasses = ['error', 'field__error'];
    const errorText: string = this.props.error || '';
    if (!errorText) {
      errorClasses.push('hidden');
    }

    return this.templator.render({
      ...this.props,
      errorText,
      errorClassName: errorClasses.join(' '),
      inputHandler: this.inputHandler,
    });
  }
}