import Component, {IState} from '../../../core/component/index.js';
import Templator from '../../../core/templator/index.js';
import MyButton from '../../../components/MyButton/index.js';
import SettingsField from '../../../components/SettingsField/index.js';
import {settingsPreviewTemplate} from './settings-preview.template.js';
import {settingsProfileTemplate} from './settings-profile.template.js';
import {settingsPasswordTemplate} from './settings-password.template.js';
import {EDIT_TARGET, TSettingsEditTarget} from '../types/index.js';
import {isEqual} from '../../../core/utils/index.js';

interface ISettingsFormProps {
  onLogout: Function,
  editTarget: TSettingsEditTarget,
  setEditTarget: (editTarget: TSettingsEditTarget) => void,
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

interface IPasswordFields {
  oldPassword: string,
  newPassword: string,
  newPasswordTwice: string,
}

interface ISettingsFormState extends IState {
  profileFields: IProfileFields,
  passwordFields: IPasswordFields,
};

const previewTemplator = Templator.compile(settingsPreviewTemplate, {
  components: {
    'settings-field': SettingsField,
  },
});

const profileTemplator = Templator.compile(settingsProfileTemplate, {
  components: {
    'my-button': MyButton,
    'settings-field': SettingsField,
  },
});

const passwordTemplator = Templator.compile(settingsPasswordTemplate, {
  components: {
    'my-button': MyButton,
    'settings-field': SettingsField,
  },
});

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

    const passwordFields = {
      oldPassword: '',
      newPassword: '',
      newPasswordTwice: '',
    };

    this.state = {profileFields, passwordFields};
    this.setProfileFieldsFromUser();
  }

  componentDidUpdate(oldProps: ISettingsFormProps) {
    if (!isEqual(oldProps.user, this.props.user)) {
      this.setProfileFieldsFromUser();
    } 
    if (oldProps.editTarget !== this.props.editTarget) {
      this.setProfileFieldsFromUser();
      this.clearPasswordFields();
    }
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

  clearPasswordFields() {
    const passwordFields = Object
      .keys(this.state.passwordFields)
      .reduce((acc, field) =>  ({...acc, [field]: ''}), {}) as IPasswordFields;

    this.setState({passwordFields});
  }

  editProfile = () => {
    this.props.setEditTarget(EDIT_TARGET.PROFILE);
  }

  editPassword = () => {
    this.props.setEditTarget(EDIT_TARGET.PASSWORD);
  }

  onProfileFieldInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const profileFields = {...this.state.profileFields, [target.name]: target.value};

    this.setState({profileFields});
  };

  onPasswordFieldInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const passwordFields = {...this.state.passwordFields, [target.name]: target.value};

    this.setState({passwordFields});
  };

  render() {
    if (!this.props.editTarget) {
      return previewTemplator({
        onLogout: this.props.onLogout,
        fields: this.state.profileFields,
        readonly: true,
        editProfile: this.editProfile,
        editPassword: this.editPassword,
      });
    }

    return this.props.editTarget === EDIT_TARGET.PROFILE
      ? profileTemplator({
        fields: this.state.profileFields,
        readonly: false,
        onInput: this.onProfileFieldInput,
      })
      : passwordTemplator({
        fields: this.state.passwordFields,
        readonly: false,
        onInput: this.onPasswordFieldInput,
      });
  }
};