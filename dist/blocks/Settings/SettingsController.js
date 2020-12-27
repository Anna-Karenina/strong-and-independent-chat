import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Settings from './Settings.js';
import { bus } from '../../core/bus/index.js';
import { authAPI, userProfileAPI } from '../../core/api/index.js';
import { store } from '../../store.js';
;
;
const templator = Templator.compile(`<settings
    :user="user"
    :onLogout="onLogout"
    :updateProfile="updateProfile"
    :updatePassword="updatePassword"
    :updateAvatar="updateAvatar"
  />`, {
    components: { settings: Settings },
});
export default class SettingsController extends Component {
    constructor(props) {
        super(props);
        this.onLogout = () => {
            authAPI
                .logout()
                .then(() => bus.emit('auth:logout'));
        };
        this.updateProfile = (profile) => {
            return userProfileAPI
                .updateProfile(profile)
                .then((newUser) => {
                store.dispatch('setUser', newUser);
            });
        };
        this.updatePassword = (passwordData) => {
            return userProfileAPI
                .updatePassword(passwordData);
        };
        this.updateAvatar = (formData) => {
            return userProfileAPI
                .updateAvatar(formData)
                .then((newUser) => {
                store.dispatch('setUser', newUser);
            });
        };
        const { state, unsubscribe } = store.select(['user'], (field, value) => {
            this.setState({ [field]: value });
        });
        this.unsubscribeStore = unsubscribe;
        this.state = {
            user: state.user,
        };
    }
    beforeDestroy() {
        this.unsubscribeStore();
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
}
;
//# sourceMappingURL=SettingsController.js.map