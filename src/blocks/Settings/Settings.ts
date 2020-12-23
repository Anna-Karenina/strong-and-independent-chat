import Router from '../../core/router/index.js';
import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import SettingsForm from './components/SettingsForm.js';
import {settingsTemplate} from './settings.template.js';
import {TSettingsEditTarget} from './types/index.js';

interface ISettingsProps {
  onLogout: Function,
  user: any,
};

interface ISettingsState extends IState {
  editTarget: TSettingsEditTarget,
};

const templator = Templator.compile(settingsTemplate, {
  components: {
    'my-button': MyButton,
    'settings-form': SettingsForm,
  },
})

export default class Settings extends Component<ISettingsProps, ISettingsState> {
  private router: Router;

  constructor(props: ISettingsProps) {
    super(props);

    this.router = new Router();
    this.state = {
      editTarget: null,
    }
  }

  goBack = () => {
    if (this.state.editTarget) {
      this.setEditTarget(null);
      return;
    }

    this.router.back();
  }

  setEditTarget = (editTarget: TSettingsEditTarget) => {
    this.setState({editTarget});
  }

  render() {
    return templator({
      editTarget: this.state.editTarget,
      user: this.props.user,
      onLogout: this.props.onLogout,
      setEditTarget: this.setEditTarget,
      goBack: this.goBack,
    });
  }
};