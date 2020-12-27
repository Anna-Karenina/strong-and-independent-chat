import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Chats from './Chats.js';
import { store } from '../../store.js';
import { chatsAPI, userAPI } from '../../core/api/index.js';
;
;
const templator = Templator.compile(`<chats
    :chats="chats"
    :sendMessage="sendMessage",
    :searchUser="searchUser",
    :addNewUserInChat="addNewUserInChat",
    :deleteUserFromChat="deleteUserFromChat",
    :fetchChatUsers="fetchChatUsers",
    :addChat="addChat",
    :deleteChat="deleteChat",
  />`, {
    components: { chats: Chats },
});
export default class ChatsController extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const aggregatedFormData = Object.fromEntries(formData.entries());
            console.log(aggregatedFormData);
        };
        this.searchUser = (data) => {
            return userAPI.search(data);
        };
        this.addNewUserInChat = (userId, chatId) => {
            return chatsAPI.addUsers({
                users: [userId],
                chatId,
            });
        };
        this.deleteUserFromChat = (userId, chatId) => {
            return chatsAPI.deleteUsers({
                users: [userId],
                chatId,
            }).then(this.fetchChats);
        };
        this.fetchChatUsers = (chatId) => {
            return chatsAPI.getChatUsers(chatId);
        };
        this.deleteChat = (chatId) => {
            return chatsAPI.deleteChat(chatId).then(this.fetchChats);
        };
        this.addChat = (title) => {
            return chatsAPI.createChat(title).then(this.fetchChats);
        };
        const { state, unsubscribe } = store.select(['chats'], (field, value) => {
            this.setState({ [field]: value });
        });
        this.unsubscribeStore = unsubscribe;
        this.state = {
            chats: state.chats,
        };
    }
    componentDidMount() {
        this.fetchChats();
    }
    beforeDestroy() {
        this.unsubscribeStore();
    }
    fetchChats() {
        chatsAPI.getChats()
            .then((chats) => store.dispatch('setChats', chats));
    }
    render() {
        return templator({
            chats: this.state.chats,
            sendMessage: this.sendMessage,
            searchUser: this.searchUser,
            addNewUserInChat: this.addNewUserInChat,
            deleteUserFromChat: this.deleteUserFromChat,
            fetchChatUsers: this.fetchChatUsers,
            addChat: this.addChat,
            deleteChat: this.deleteChat,
        });
    }
}
;
//# sourceMappingURL=ChatsController.js.map