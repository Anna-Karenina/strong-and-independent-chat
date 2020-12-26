import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Chats from './Chats.js';
import {store, IChat} from '../../store.js';
import {chatsAPI, userAPI, ISearchData} from '../../core/api/index.js';

interface IChatsControllerProps {};

interface IChatsControllerState {
  chats: IChat[]
};

const templator = Templator.compile(
  `<chats
    :chats="chats"
    :sendMessage="sendMessage",
    :searchUser="searchUser",
    :addNewUserInChat="addNewUserInChat",
    :deleteUserFromChat="deleteUserFromChat",
    :fetchChatUsers="fetchChatUsers",
    :addChat="addChat",
    :deleteChat="deleteChat",
  />`,
  {
    components: {chats: Chats},
  }
);

export default class ChatsController extends Component<IChatsControllerProps, IChatsControllerState> {
  private unsubscribeStore: () => void;

  constructor(props: IChatsControllerProps) {
    super(props);

    const {state, unsubscribe} = store.select(['chats'], (field, value) => {
      this.setState({[field]: value});
    });

    this.unsubscribeStore = unsubscribe;

    this.state = {
      chats: state.chats as IChat[],
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
      .then((chats) => store.dispatch('setChats', chats))
  }
  
  sendMessage = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const aggregatedFormData = Object.fromEntries(formData.entries());
    console.log(aggregatedFormData);
  };

  searchUser = (data: ISearchData) => {
    return userAPI.search(data);
  }

  addNewUserInChat = (userId: number, chatId: number) => {
    return chatsAPI.addUsers({
      users: [userId],
      chatId,
    });
  }

  deleteUserFromChat = (userId: number, chatId: number) => {
    return chatsAPI.deleteUsers({
      users: [userId],
      chatId,
    }).then(this.fetchChats);
  }

  fetchChatUsers = (chatId: number) => {
    return chatsAPI.getChatUsers(chatId);
  }

  deleteChat = (chatId: number) => {
    return chatsAPI.deleteChat(chatId).then(this.fetchChats);
  }

  addChat = (title: string) => {
    return chatsAPI.createChat(title).then(this.fetchChats);
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
};