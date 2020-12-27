import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Modal from '../../components/Modal/index.js';
import Field from '../../components/Field/index.js';
import Avatar from '../../components/Avatar/index.js';
import Chat from './components/Chat/Chat.js';
import AddChatModal from './components/AddChatModal/AddChatModal.js';
import { chatsTemplate } from './chats.template.js';
;
;
const templator = Templator.compile(chatsTemplate, {
    components: {
        'my-button': MyButton,
        'field': Field,
        'chat': Chat,
        'modal': Modal,
        'avatar': Avatar,
        'add-chat-modal': AddChatModal,
    },
});
export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.goToProfile = () => {
            this.router.go('/settings');
        };
        this.closeAddUserModal = () => {
            this.setState({ showAddUserModal: false, search: '', users: [] });
        };
        this.openAddUserModal = () => {
            this.setState({ showAddUserModal: true });
        };
        this.closeDeleteUserModal = () => {
            this.setState({ showDeleteUserModal: false, users: [] });
        };
        this.openDeleteUserModal = () => {
            this.setState({ showDeleteUserModal: true });
            this.props.fetchChatUsers(this.selectedChatId).then((users) => {
                this.setState({ users });
            });
        };
        this.closeAddChatModal = () => {
            this.setState({ showAddChatModal: false });
        };
        this.openAddChatModal = () => {
            this.setState({ showAddChatModal: true });
        };
        this.onSearch = async (e) => {
            const search = e.target.value;
            this.setState({ search });
            const users = await this.props.searchUser({ login: search });
            this.setState({ users });
        };
        this.router = new Router();
        this.state = {
            selectedChat: null,
            showAddUserModal: false,
            showDeleteUserModal: false,
            showAddChatModal: false,
            search: '',
            users: [],
            fetching: false,
        };
    }
    componentDidMount() {
        this.searchRef = this.element.querySelector('.search__input');
        if (this.searchRef) {
            this.searchRef.value = this.state.search;
        }
    }
    componentDidUpdate() {
        if (this.searchRef) {
            this.searchRef.value = this.state.search;
        }
        if (this.state.selectedChat) {
            const isExist = !!this.props.chats.find((chat) => chat.id === this.selectedChatId);
            if (!isExist) {
                this.setState({ selectedChat: null });
            }
        }
    }
    get selectedChatId() {
        var _a;
        return ((_a = this.state.selectedChat) === null || _a === void 0 ? void 0 : _a.id) || 0;
    }
    get chats() {
        return this.props.chats.map((chat) => ({
            ...chat,
            onClick: () => this.setState({ selectedChat: chat })
        }));
    }
    get users() {
        return this.state.users.map((user) => ({
            ...user,
            add: this.createAddUserHandler(user.id),
            remove: this.createRemoveUserHandler(user.id),
        }));
    }
    createAddUserHandler(userId) {
        if (!this.selectedChatId)
            return () => { };
        return () => {
            if (this.state.fetching)
                return;
            this.setState({ fetching: true });
            this.props.addNewUserInChat(userId, this.selectedChatId)
                .then(this.closeAddUserModal)
                .finally(() => this.setState({ fetching: false }));
        };
    }
    createRemoveUserHandler(userId) {
        if (!this.selectedChatId)
            return () => { };
        return () => {
            if (this.state.fetching)
                return;
            this.setState({ fetching: true });
            this.props.deleteUserFromChat(userId, this.selectedChatId)
                .then(this.closeDeleteUserModal)
                .finally(() => this.setState({ fetching: false }));
        };
    }
    render() {
        return templator({
            chats: this.chats,
            selectedChat: this.state.selectedChat,
            showAddUserModal: this.state.showAddUserModal,
            showDeleteUserModal: this.state.showDeleteUserModal,
            showAddChatModal: this.state.showAddChatModal,
            search: this.state.search,
            users: this.users,
            closeAddUserModal: this.closeAddUserModal,
            openAddUserModal: this.openAddUserModal,
            closeDeleteUserModal: this.closeDeleteUserModal,
            openDeleteUserModal: this.openDeleteUserModal,
            closeAddChatModal: this.closeAddChatModal,
            openAddChatModal: this.openAddChatModal,
            sendMessage: this.props.sendMessage,
            deleteChat: this.props.deleteChat,
            addChat: this.props.addChat,
            goToProfile: this.goToProfile,
            onSearch: this.onSearch,
        });
    }
}
;
//# sourceMappingURL=Chats.js.map