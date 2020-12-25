import Router from '../../core/router/index.js';
import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Modal from '../../components/Modal/index.js';
import Field from '../../components/Field/index.js';
import Chat from './components/Chat/Chat.js';
import {IChat} from '../../store.js';
import {chatsTemplate} from './chats.template.js';
import {ISearchData} from '../../core/api/index.js';

interface IChatsProps {
  chats: IChat[],
  sendMessage: (e: Event) => any,
  searchUser: (data: ISearchData) => any,
  addNewUserInChat: (userId: number, chatId: number) => any,
};

interface IChatsState extends IState {
  selectedChat: IChat | null,
  showAddUserModal: boolean,
  search: string,
  users: Record<string, unknown>[],
};

const templator = Templator.compile(chatsTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
    'chat': Chat,
    'modal': Modal,
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
    }));
  }

  goToProfile = () => {
    this.router.go('/settings');
  }

  createAddUserHandler(userId: number) {
    const chatId = this.state.selectedChat?.id;
    if (!chatId) return () => {};

    return () => this.props.addNewUserInChat(userId, chatId).then(this.closeAddUserModal);
  }

  closeAddUserModal = () => {
    this.setState({showAddUserModal: false, search: '', users: []});
  }

  openAddUserModal = () => {
    this.setState({showAddUserModal: true});
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
      search: this.state.search,
      users: this.users,
      closeAddUserModal: this.closeAddUserModal,
      openAddUserModal: this.openAddUserModal,
      sendMessage: this.props.sendMessage,
      goToProfile: this.goToProfile,
      onSearch: this.onSearch,
    });
  }
};