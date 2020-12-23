import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './settings-field.template.js';

interface ISettingsFieldProps {
  value: string,
  type?: string,
  className?: string,
  name?: string,
  label?: string,
  readonly?: string,
  error?: string | null,
};

const templator = Templator.compile(template)

export default class SettingsField extends Component {
  constructor(props: ISettingsFieldProps) {
    super(props);
  }

  render() {
    const {
      type = 'text',
      className = '',
      name = '',
      label = '',
      readonly = 'off',
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