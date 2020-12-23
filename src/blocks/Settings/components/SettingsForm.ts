import Component, {IState} from '../../../core/component/index.js';
import Templator from '../../../core/templator/index.js';
import MyButton from '../../../components/MyButton/index.js';
import SettingsField from '../../../components/SettingsField/index.js';
import {settingsPreviewTemplate} from './settings-preview.template.js';

interface ISettingsFormProps {
  onLogout: Function,
  user: null | Record<string, string | null>,
};

interface IProfileFields {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

interface ISettingsFormState extends IState {
  profileFields: IProfileFields,
};

const templator = Templator.compile(settingsPreviewTemplate, {
  components: {
    'my-button': MyButton,
    'settings-field': SettingsField,
  },
})

export default class SettingsForm extends Component<ISettingsFormProps, ISettingsFormState> {
  constructor(props: ISettingsFormProps) {
    super(props);

    const profileFields = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
    };

    this.state = {profileFields};
  }

  setProfileFieldsFromUser() {
    const {user} = this.props;

    const profileFields = Object
      .keys(this.state.profileFields)
      .reduce((acc, field) => {
        const value = (user && user[field]) || '';
        return {...acc, [field]: value};
      }, {}) as IProfileFields;

    this.setState({profileFields});
  }

  componentDidUpdate(oldProps: ISettingsFormProps) {
    if (oldProps.user !== this.props.user) {
      this.setProfileFieldsFromUser();
    }
  }

  render() {
    return templator({
      user: this.props.user,
      onLogout: this.props.onLogout,
      fields: this.state.profileFields,
    });
  }
};