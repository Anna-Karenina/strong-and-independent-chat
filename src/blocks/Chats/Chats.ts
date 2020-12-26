import Router from '../../core/router/index.js';
import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Modal from '../../components/Modal/index.js';
import Field from '../../components/Field/index.js';
import Avatar from '../../components/Avatar/index.js';
import Chat from './components/Chat/Chat.js';
import {IChat} from '../../store.js';
import {chatsTemplate} from './chats.template.js';
import {ISearchData} from '../../core/api/index.js';

interface IChatsProps {
  chats: IChat[],
  sendMessage: (e: Event) => any,
  searchUser: (data: ISearchData) => any,
  addNewUserInChat: (userId: number, chatId: number) => any,
  deleteUserFromChat: (userId: number, chatId: number) => any,
  fetchChatUsers: (chatId: number) => any,
  deleteChat: (chatId: number) => any,
};

interface IChatsState extends IState {
  selectedChat: IChat | null,
  showAddUserModal: boolean,
  showDeleteUserModal: boolean,
  search: string,
  users: Record<string, unknown>[],
};

const templator = Templator.compile(chatsTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
    'chat': Chat,
    'modal': Modal,
    'avatar': Avatar,
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
      search: '',
      users: [],
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

    return () => this.props.addNewUserInChat(userId, this.selectedChatId).then(this.closeAddUserModal);
  }

  createRemoveUserHandler(userId: number) {
    if (!this.selectedChatId) return () => {};

    return () => this.props.deleteUserFromChat(userId, this.selectedChatId).then(this.closeDeleteUserModal);
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

    this.props.fetchChatUsers(this.selectedChatId).then((users: any[]) => {
      this.setState({users});
    });
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
      search: this.state.search,
      users: this.users,
      closeAddUserModal: this.closeAddUserModal,
      openAddUserModal: this.openAddUserModal,
      closeDeleteUserModal: this.closeDeleteUserModal,
      openDeleteUserModal: this.openDeleteUserModal,
      sendMessage: this.props.sendMessage,
      deleteChat: this.props.deleteChat,
      goToProfile: this.goToProfile,
      onSearch: this.onSearch,
    });
  }
};