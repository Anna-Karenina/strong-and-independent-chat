import Component, {IState} from '../../../../core/component/index.js';
import Templator from '../../../../core/templator/index.js';
import Avatar from '../../../../components/Avatar/index.js';
import {IChat} from '../../../../store.js';
import {chatTemplate} from './chat.template.js';

interface IChatProps {
  chat: IChat | null,
  sendMessage: (e: Event) => any,
  openAddUserModal: () => void,
  openDeleteUserModal: () => void,
  deleteChat: (chatId: number) => any,
};

interface IChatState extends IState {
  showUserOptions: boolean,
};

interface IChatProps {
  chat: IChat | null,
  sendMessage: (e: Event) => any,
};

const templator = Templator.compile(chatTemplate, {
  components: {
    'avatar': Avatar,
  }
});

export default class Chat extends Component<IChatProps, IChatState> {

  constructor(props: IChatProps) {
    super(props);

    this.state = {
      showUserOptions: false,
    }
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
    const {chat} = this.props;
    return chat && chat.title || '';
  }

  get avatar() {
    return this.props.chat?.avatar;
  }

  userOptionsOutsideClick = (e: Event) => {
    if (!(e.target as HTMLElement).closest('[data-click="ignore"]')) {
      this.setState({showUserOptions: false});
    }
  }

  openUserOptions = () => {
    this.setState({showUserOptions: true});
  }

  openAddUserModal = () => {
    this.props.openAddUserModal();
    this.setState({showUserOptions: false});
  }

  openDeleteUserModal = () => {
    this.props.openDeleteUserModal();
    this.setState({showUserOptions: false});
  }

  deleteChat = () => {
    this.props.deleteChat(this.props.chat?.id as number);
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
};