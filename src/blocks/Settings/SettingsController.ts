import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Settings from './Settings.js';
import {bus} from '../../core/bus/index.js';
import {authAPI, userProfileAPI, IProfileUpdateData, IPasswordUpdateData} from '../../core/api/index.js';
import {store} from '../../store.js';
import {IUser} from '../../types/index.js';

interface ISettingsControllerProps {};

interface ISettingsControllerState {
  user: IUser | null,
};

const templator = Templator.compile(
  `<settings
    :user="user"
    :onLogout="onLogout"
    :updateProfile="updateProfile"
    :updatePassword="updatePassword"
    :updateAvatar="updateAvatar"
  />`,
  {
    components: {settings: Settings},
  }
);

export default class SettingsController extends Component<ISettingsControllerProps, ISettingsControllerState> {
  private unsubscribeStore: () => void;

  constructor(props: ISettingsControllerProps) {
    super(props);

    const {state, unsubscribe} = store.select(['user'], (field, value) => {
      this.setState({[field]: value});
    });

    this.unsubscribeStore = unsubscribe;

    this.state = {
      user: state.user as IUser | null,
    };
  }

  beforeDestroy() {
    this.unsubscribeStore();
  }

  onLogout = () => {
    authAPI
      .logout()
      .then(() => bus.emit('auth:logout'));
  };

  updateProfile = (profile: IProfileUpdateData) => {
    return userProfileAPI
      .updateProfile(profile)
      .then((newUser) => {
        store.dispatch('setUser', newUser);
      });
  }

  updatePassword = (passwordData: IPasswordUpdateData) => {
    return userProfileAPI
      .updatePassword(passwordData);
  }

  updateAvatar = (formData: FormData) => {
    return userProfileAPI
      .updateAvatar(formData)
      .then((newUser) => {
        store.dispatch('setUser', newUser);
      });
  }

  render() {
    return templator({
      user: this.state.user,
      onLogout: this.onLogout,
      updateProfile: this.updateProfile,
      updatePassword: this.updatePassword,
      updateAvatar: this.updateAvatar,
    });
  }
};