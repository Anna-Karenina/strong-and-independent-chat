import Component from '@core/component';
import Templator from '@core/templator';
import {template} from './settings-field.template';
import {classNames as cn} from '@core/utils';

import './SettingsField.scss';

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
    
    const errorText = error || '';

    return templator({
      value,
      type,
      name,
      label,
      readonly,
      errorText,
      errorClassName: cn('error', {hidden: !errorText}),
      className: cn('settings-field', className),
    });
  }
}