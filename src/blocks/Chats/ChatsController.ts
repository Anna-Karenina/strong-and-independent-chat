import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Chats from './Chats.js';
import {store, IChat} from '../../store.js';
import {chatsAPI, userAPI, ISearchData} from '../../core/api/index.js';

interface IChatsControllerProps {};

interface IChatsControllerState extends IState {
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
  />`,
  {
    components: {chats: Chats},
  }
);

export default class ChatsController extends Component<IChatsControllerProps, IChatsControllerState> {
  constructor(props: IChatsControllerProps) {
    super(props);

    const {state} = store.select(['chats'], (field, value) => {
      this.setState({[field]: value});
    });

    this.state = {
      chats: state.chats as IChat[],
    };
  }

  componentDidMount() {
    this.fetchChats();
  }

  fetchChats() {
    chatsAPI.getChats()
      .then((chats) => store.dispatch('setChats', chats))
  }

  onNewUserLoginInput = (e: Event) => {
    const target = e.target as HTMLFormElement;

    this.setState({newUserLogin: target.value});
  };
  
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

  render() {
    return templator({
      chats: this.state.chats,
      sendMessage: this.sendMessage,
      searchUser: this.searchUser,
      addNewUserInChat: this.addNewUserInChat,
      deleteUserFromChat: this.deleteUserFromChat,
      fetchChatUsers: this.fetchChatUsers,
    });
  }
};