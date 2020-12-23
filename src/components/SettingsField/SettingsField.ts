import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './settings-field.template.js';

interface ISettingsFieldProps {
  value: string,
  type?: string,
  className?: string,
  name?: string,
  label?: string,
  readonly?: boolean,
  error?: string | null,
};

const templator = Templator.compile(template)

export default class SettingsField extends Component {
  private inputRef: HTMLInputElement | null;

  constructor(props: ISettingsFieldProps) {
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
      type = 'text',
      className = '',
      name = '',
      label = '',
      readonly = false,
      error,
      value,
    } = this.props;
    
    const errorClasses = ['error'];
    const errorText: string = error || '';
    if (!errorText) {
      errorClasses.push('hidden');
    }

    return templator({
      value,
      type,
      name,
      label,
      readonly,
      errorText,
      errorClassName: errorClasses.join(' '),
      className: ['settings-field', className].join(' ')
    });
  }
}