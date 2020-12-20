import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import SettingsField from '../../components/SettingsField/index.js';
import {IFormState} from '../../core/validation/index.js';
import {settingsTemplate} from './settings.template.js';

interface ISettingsProps {
  onSubmit: (e: Event) => any,
  onFocusout: (e: Event) => any,
  onInput: (e: Event) => any,
  formState: IFormState,
  fields: {[key: string]: string},
};

const templator = Templator.compile(settingsTemplate, {
  components: {
    'my-button': MyButton,
    'settings-field': SettingsField,
  },
})

export default class Settings extends Component {
  constructor(props: ISettingsProps) {
    super(props);
  }

  render() {
    return templator(this.props);
  }
};