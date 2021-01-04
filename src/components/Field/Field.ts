import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './field.template.js';

interface IFieldProps {
  value: string,
  type?: string,
  className?: string,
  name?: string,
  label?: string,
  error?: string | null,
};

const templator = Templator.compile(template);

export default class Field extends Component {
  private inputRef: HTMLInputElement | null;
  
  constructor(props: IFieldProps) {
    super(props);
  }

  componentDidMount() {
    this.inputRef = (this.element as HTMLElement).querySelector('input');

    if (this.inputRef) {
      this.inputRef.value = this.props.value
    }
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.value = this.props.value
    }
  }

  render() {
    const {
      value,
      type = 'text',
      className = '',
      name = '',
      label = '',
      error,
    } = this.props;
    const errorClasses = ['error', 'field__error'];
    const errorText = error || '';
    if (!errorText) {
      errorClasses.push('hidden');
    }

    return templator({
      value,
      name,
      type,
      label,
      errorText,
      errorClassName: errorClasses.join(' '),
      className: ['field', className].join(' '),
    });
  }
}