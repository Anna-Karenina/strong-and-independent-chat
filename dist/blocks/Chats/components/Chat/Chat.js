import Component from '../../../../core/component/index.js';
import Templator from '../../../../core/templator/index.js';
import Avatar from '../../../../components/Avatar/index.js';
import { chatTemplate } from './chat.template.js';
;
;
;
const templator = Templator.compile(chatTemplate, {
    components: {
        'avatar': Avatar,
    }
});
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.userOptionsOutsideClick = (e) => {
            if (!e.target.closest('[data-click="ignore"]')) {
                this.setState({ showUserOptions: false });
            }
        };
        this.openUserOptions = () => {
            this.setState({ showUserOptions: true });
        };
        this.openAddUserModal = () => {
            this.props.openAddUserModal();
            this.setState({ showUserOptions: false });
        };
        this.openDeleteUserModal = () => {
            this.props.openDeleteUserModal();
            this.setState({ showUserOptions: false });
        };
        this.deleteChat = () => {
            var _a;
            if (this.state.fetching)
                return;
            this.setState({ fetching: true });
            this.props.deleteChat((_a = this.props.chat) === null || _a === void 0 ? void 0 : _a.id)
                .finally(() => this.setState({ fetching: false }));
        };
        this.state = {
            showUserOptions: false,
            fetching: false,
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.userOptionsOutsideClick);
    }
    beforeDestroy() {
        document.body.removeEventListener('click', this.userOptionsOutsideClick);
    }
    get userOptionsClass() {
        const defaultClass = 'options user-bar__options';
        return this.state.showUserOptions ? defaultClass : `${defaultClass} hidden`;
    }
    get chatClass() {
        return this.props.chat ? 'chat' : 'chat hidden';
    }
    get title() {
        const { chat } = this.props;
        return chat && chat.title || '';
    }
    get avatar() {
        var _a;
        return (_a = this.props.chat) === null || _a === void 0 ? void 0 : _a.avatar;
    }
    render() {
        return templator({
            title: this.title,
            chatClass: this.chatClass,
            userOptionsClass: this.userOptionsClass,
            avatar: this.avatar,
            deleteChat: this.deleteChat,
            openAddUserModal: this.openAddUserModal,
            openDeleteUserModal: this.openDeleteUserModal,
            openUserOptions: this.openUserOptions,
            sendMessage: this.props.sendMessage,
        });
    }
}
;
//# sourceMappingURL=Chat.js.map