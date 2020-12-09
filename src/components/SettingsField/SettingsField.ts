import Component from '../../core/Component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './settings-field.template.js';

interface ISettingsFieldProps {
  value: string,
  type: string,
  className: string,
  name: string,
  label: string,
  error?: string | null,
};

export default class SettingsField extends Component {
  private templator: Templator;

  constructor(props: ISettingsFieldProps) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(template);
  }

  render() {
    const errorClasses = ['error'];
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