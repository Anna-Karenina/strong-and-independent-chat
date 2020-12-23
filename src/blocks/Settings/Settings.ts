import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import SettingsForm from './components/SettingsForm.js';
import {settingsTemplate} from './settings.template.js';

interface ISettingsProps {
  onLogout: Function,
  user: any,
};

const templator = Templator.compile(settingsTemplate, {
  components: {
    'my-button': MyButton,
    'settings-form': SettingsForm,
  },
})

export default class Settings extends Component<ISettingsProps> {
  private router: Router;

  constructor(props: ISettingsProps) {
    super(props);

    this.router = new Router();
  }

  goBack = () => {
    this.router.back();
  }

  render() {
    return templator({
      onLogout: this.props.onLogout,
      user: this.props.user,
      goBack: this.goBack,
    });
  }
};