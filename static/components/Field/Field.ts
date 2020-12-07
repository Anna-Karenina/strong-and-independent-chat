import Component from '../../core/Component/index.js';
import Templator from '../../core/templator/index.js'
import { template } from './field.template.js';

interface IFieldProps {
  value: string,
  type: string,
  className: string,
  name: string,
  label: string,
  error?: string | null,
};
export default class Field extends Component {
  private templator: Templator;

  constructor(props: IFieldProps) {
    super(props);
  }

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
    });
  }
}