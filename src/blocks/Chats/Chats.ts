import Router from '@core/router';
import Component from '@core/component';
import Templator from '@core/templator';
import MyButton from '@components/MyButton';
import Modal from '@components/Modal';
import Field from '@components/Field';
import Avatar from '@components/Avatar';
import Chat from './components/Chat/Chat';
import AddChatModal from './components/AddChatModal/AddChatModal';
import {chatsTemplate} from './chats.template';
import {ISearchData} from '@core/api';
import {IUser, IChat} from '@/types';

import './chats.scss';

interface IChatsProps {
  chats: IChat[],
  sendMessage: (e: Event) => any,
  searchUser: (data: ISearchData) => Promise<IUser[]>,
  addNewUserInChat: (userId: number, chatId: number) => any,
  deleteUserFromChat: (userId: number, chatId: number) => any,
  fetchChatUsers: (chatId: number) => Promise<IUser[]>,
  addChat: (title: string) => any,
  deleteChat: (chatId: number) => any,
};

interface IChatsState {
  selectedChat: IChat | null,
  showAddUserModal: boolean,
  showDeleteUserModal: boolean,
  showAddChatModal: boolean,
  search: string,
  users: IUser[],
  fetching: boolean,
};

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
export default class Chats extends Component<IChatsProps, IChatsState> {
  private router: Router;
  private searchRef: HTMLInputElement | null;

  constructor(props: IChatsProps) {
    super(props);

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
    this.searchRef = (this.element as HTMLElement).querySelector('.search__input');

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
        this.setState({selectedChat: null});
      }
    }
  }

  get selectedChatId() {
    return this.state.selectedChat?.id || 0;
  }

  get chats() {
    return this.props.chats.map((chat) => ({
      ...chat,
      onClick: () => this.setState({selectedChat: chat})
    }));
  }

  get users() {
    return this.state.users.map((user) => ({
      ...user,
      add: this.createAddUserHandler(user.id as number),
      remove: this.createRemoveUserHandler(user.id as number),
    }));
  }

  goToProfile = () => {
    this.router.go('/settings');
  }

  createAddUserHandler(userId: number) {
    if (!this.selectedChatId) return () => {};

    return () => {
      if (this.state.fetching) return;
      this.setState({fetching: true});

      this.props.addNewUserInChat(userId, this.selectedChatId)
        .then(this.closeAddUserModal)
        .finally(() => this.setState({fetching: false}));
    }
  }

  createRemoveUserHandler(userId: number) {
    if (!this.selectedChatId) return () => {};

    return () => {
      if (this.state.fetching) return;
      this.setState({fetching: true});
      
      this.props.deleteUserFromChat(userId, this.selectedChatId)
        .then(this.closeDeleteUserModal)
        .finally(() => this.setState({fetching: false}));
    }
  }

  closeAddUserModal = () => {
    this.setState({showAddUserModal: false, search: '', users: []});
  }

  openAddUserModal = () => {
    this.setState({showAddUserModal: true});
  }

  closeDeleteUserModal = () => {
    this.setState({showDeleteUserModal: false, users: []});
  }

  openDeleteUserModal = () => {
    this.setState({showDeleteUserModal: true});

    this.props.fetchChatUsers(this.selectedChatId).then((users: IUser[]) => {
      this.setState({users});
    });
  }

  closeAddChatModal = () => {
    this.setState({showAddChatModal: false});
  }

  openAddChatModal = () => {
    this.setState({showAddChatModal: true});
  }

  onSearch = async (e: Event) => {
    const search = (e.target as HTMLInputElement).value;
    this.setState({search});

    const users = await this.props.searchUser({login: search});
    this.setState({users});
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
};