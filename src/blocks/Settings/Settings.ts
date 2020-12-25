import Router from '../../core/router/index.js';
import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import AvatarModal from './components/AvatarModal/AvatarModal.js';
import SettingsForm from './components/SettingsForm/SettingsForm.js';
import {settingsTemplate} from './settings.template.js';
import {TSettingsEditTarget} from './types/index.js';

interface ISettingsProps {
  onLogout: Function,
  updateProfile: Function, 
  updatePassword: Function, 
  updateAvatar: Function, 
  user: any,
};

interface ISettingsState extends IState {
  editTarget: TSettingsEditTarget,
  showAvatarModal: boolean,
};

const templator = Templator.compile(settingsTemplate, {
  components: {
    'my-button': MyButton,
    'settings-form': SettingsForm,
    'avatar-modal': AvatarModal,
  },
})

export default class Settings extends Component<ISettingsProps, ISettingsState> {
  private router: Router;

  constructor(props: ISettingsProps) {
    super(props);

    this.router = new Router();
    this.state = {
      editTarget: null,
      showAvatarModal: false,
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

  closeAvatarModal = () => {
    this.setState({showAvatarModal: false});
  }

  openAvatarModal = () => {
    this.setState({showAvatarModal: true});
  }

  render() {
    return templator({
      editTarget: this.state.editTarget,
      showAvatarModal: this.state.showAvatarModal,
      user: this.props.user,
      onLogout: this.props.onLogout,
      updateProfile: this.props.updateProfile,
      updatePassword: this.props.updatePassword,
      updateAvatar: this.props.updateAvatar,
      closeAvatarModal: this.closeAvatarModal,
      openAvatarModal: this.openAvatarModal,
      setEditTarget: this.setEditTarget,
      goBack: this.goBack,
    });
  }
};