import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import AvatarModal from './components/AvatarModal/AvatarModal.js';
import SettingsForm from './components/SettingsForm/SettingsForm.js';
import { HOST } from '../../core/http/index.js';
import { settingsTemplate } from './settings.template.js';
;
;
const templator = Templator.compile(settingsTemplate, {
    components: {
        'my-button': MyButton,
        'settings-form': SettingsForm,
        'avatar-modal': AvatarModal,
    },
});
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.goBack = () => {
            if (this.state.editTarget) {
                this.setEditTarget(null);
                return;
            }
            this.router.back();
        };
        this.setEditTarget = (editTarget) => {
            this.setState({ editTarget });
        };
        this.closeAvatarModal = () => {
            this.setState({ showAvatarModal: false });
        };
        this.openAvatarModal = () => {
            this.setState({ showAvatarModal: true });
        };
        this.router = new Router();
        this.state = {
            editTarget: null,
            showAvatarModal: false,
        };
    }
    get avatar() {
        const { user } = this.props;
        const avatar = user && user.avatar || '';
        return avatar ? `${HOST}${avatar}` : avatar;
    }
    get avatarStyle() {
        if (!this.avatar)
            return '';
        return `background-image: url("${this.avatar}")`;
    }
    get avatarIconClass() {
        const defaultClass = 'fas fa-image';
        return this.avatar ? `${defaultClass} hidden` : defaultClass;
    }
    get name() {
        const { user } = this.props;
        return user && user.first_name || 'User';
    }
    render() {
        return templator({
            editTarget: this.state.editTarget,
            showAvatarModal: this.state.showAvatarModal,
            user: this.props.user,
            name: this.name,
            avatarStyle: this.avatarStyle,
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
}
;
//# sourceMappingURL=Settings.js.map