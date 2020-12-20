import Component from '../../core/componentV2/index.js';
import Templator from '../../core/templatorV2/index.js'
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
  constructor(props: IFieldProps) {
    super(props);
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
    const errorText: string = error || '';
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