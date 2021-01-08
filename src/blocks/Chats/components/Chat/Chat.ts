import Component from '../../../../core/component/index';
import Templator from '../../../../core/templator/index';
import Avatar from '../../../../components/Avatar/index';
import {IChat} from '../../../../types/index';
import {chatTemplate} from './chat.template';
import {classNames as cn} from '../../../../core/utils/index';

import './Chat.scss';

interface IChatProps {
  chat: IChat | null,
  sendMessage: (e: Event) => any,
  openAddUserModal: () => void,
  openDeleteUserModal: () => void,
  deleteChat: (chatId: number) => any,
};

interface IChatState {
  showUserOptions: boolean,
  fetching: boolean,
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
      fetching: false,
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.userOptionsOutsideClick);
  }

  beforeDestroy() {
    document.body.removeEventListener('click', this.userOptionsOutsideClick);
  }

  get userOptionsClass() {
    return cn('options', 'user-bar__options', {hidden: !this.state.showUserOptions});
  }

  get chatClass() {
    return cn('chat', {hidden: !this.props.chat});
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
    if (this.state.fetching) return;
    this.setState({fetching: true});

    this.props.deleteChat(this.props.chat?.id as number)
      .finally(() => this.setState({fetching: false}));
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