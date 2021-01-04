import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import AvatarModal from './components/AvatarModal/AvatarModal.js';
import SettingsForm from './components/SettingsForm/SettingsForm.js';
import {HOST} from '../../core/http/index.js'
import {settingsTemplate} from './settings.template.js';
import {TSettingsEditTarget} from './types/index.js';
import {IUser} from '../../types/index.js';
import {classNames as cn} from '../../core/utils/index.js';

interface ISettingsProps {
  onLogout: Function,
  updateProfile: Function, 
  updatePassword: Function, 
  updateAvatar: Function, 
  user: IUser,
};

interface ISettingsState {
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

  get avatar() {
    const {user} = this.props;
    const avatar = user && user.avatar || '';

    return avatar ? `${HOST}${avatar}` : avatar;
  }

  get avatarIconClass() {
    return cn('fas', 'fa-image', {hidden: this.avatar});
  }

  get name() {
    const {user} = this.props;
    return user && user.first_name || 'User';
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
      name: this.name,
      avatar: this.avatar,
      avatarIconClass: this.avatarIconClass,
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