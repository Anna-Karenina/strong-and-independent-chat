import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Settings from './Settings.js';
import {bus} from '../../core/bus/index.js';
import {authAPI} from '../../core/api/index.js';
import {store} from '../../store.js';

interface ISettingsControllerProps {};

type TUser = null | Record<string, string | null>;

interface ISettingsControllerState extends IState {
  user: TUser,
};

const templator = Templator.compile(
  `<settings :onLogout="onLogout" :user="user" />`,
  {
    components: {settings: Settings},
  }
);

export default class SettingsController extends Component<ISettingsControllerProps, ISettingsControllerState> {
  constructor(props: ISettingsControllerProps) {
    super(props);

    const {state} = store.select(['user'], (field, value) => {
      this.setState({[field]: value});
    });

    this.state = {
      user: state.user as TUser,
    };
  }

  onLogout = () => {
    authAPI
      .logout()
      .then(() => bus.emit('auth:logout'));
  };

  render() {
    return templator({
      user: this.state.user,
      onLogout: this.onLogout,
    });
  }
};