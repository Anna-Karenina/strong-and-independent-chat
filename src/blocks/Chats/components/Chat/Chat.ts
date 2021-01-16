import Component from '@core/component';
import Templator from '@core/templator';
import Avatar from '@components/Avatar';
import Message from '../Message/Message';
import {IChat, IMessage} from '@/types';
import {chatTemplate} from './chat.template';
import {classNames as cn} from '@core/utils';

import './Chat.scss';

interface IChatProps {
  userId: number,
  chat: IChat | null,
  messages: IMessage[],
  sendMessage: (chatId: number, message: string) => void,
  getOldMessages: (chatId: number) => void,
  openAddUserModal: () => void,
  openDeleteUserModal: () => void,
  deleteChat: (chatId: number) => Promise<unknown>,
}

interface IChatState {
  message: string,
  showUserOptions: boolean,
  fetching: boolean,
}

const templator = Templator.compile(chatTemplate, {
  components: {
    'avatar': Avatar,
    'message': Message,
  }
});

export default class Chat extends Component<IChatProps, IChatState> {
  private messageInputRef: HTMLInputElement | null = null;

  private messagesRef: HTMLInputElement | null = null;

  constructor(props: IChatProps) {
    super(props);

    this.state = {
      message: '',
      showUserOptions: false,
      fetching: false,
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.userOptionsOutsideClick);

    this.messageInputRef = (this.element as HTMLElement).querySelector('.send-message__input');

    this.messagesRef = (this.element as HTMLElement).querySelector('.messages');
  }

  componentDidUpdate(oldProps: IChatProps) {
    if (this.messageInputRef) {
      this.messageInputRef.value = this.state.message;
    }

    this.maybeScrollBottom(oldProps);
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

  maybeScrollBottom(oldProps: IChatProps) {
    if (!this.messagesRef) return;

    if (this.chatIdHasChanging(oldProps)) {
      this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
    } else if (this.isViewPortNextToNewMessages(oldProps)) {
      this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
    } else {
      this.maybeReturnScroll(oldProps);
    }
  }

  chatIdHasChanging(oldProps: IChatProps) {
    const oldChatId = oldProps.chat?.id;
    const chatId = this.props.chat?.id;

    return oldChatId !== chatId;
  }

  isViewPortNextToNewMessages(oldProps: IChatProps) {
    if (!this.messagesRef) return false;

    const oldMessagesLength = oldProps.messages.length;
    const messagesLength = this.props.messages.length;

    const hasNewMessages = messagesLength > oldMessagesLength;
    if (!hasNewMessages) return false;

    const {scrollHeight, scrollTop, clientHeight} = this.messagesRef;
    return scrollHeight - (scrollTop + clientHeight) <= 150;
  }

  maybeReturnScroll(oldProps: IChatProps) {
    if (!this.messagesRef) return;

    const oldFirstMessageId = oldProps.messages[0]?.id || 0;
    const positionInNewMessages = this.props.messages.findIndex(({id}) => id === oldFirstMessageId);

    if (positionInNewMessages > 0) {
      const prevMessageId = this.props.messages[positionInNewMessages - 1].id;
      const prevMessageSelector = `li[data-message-id="${prevMessageId}"]`;

      const $prevMessage = this.messagesRef.querySelector(prevMessageSelector);
      if (!$prevMessage) return;

      const prevMessageBox = $prevMessage.getBoundingClientRect();
      const messagesBox = this.messagesRef.getBoundingClientRect();
      
      this.messagesRef.scrollTop = prevMessageBox.top - messagesBox.top;
    }
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

  onInputMessage = (e: Event) => {
    const target = e.target as HTMLInputElement;

    this.setState({message: target.value});
  }

  sendMessage = (e: Event) => {
    e.preventDefault();
    const message = this.state.message.trim();
    if (!message) return;

    const chatId = this.props.chat?.id || 0;
    
    this.props.sendMessage(chatId, message);
    this.setState({message: ''});
  }

  onScrollChat = (event: Event) => {
    const target = event.target as HTMLElement;

    if (!target.scrollTop) {
      const chatId = this.props.chat?.id || 0;
      this.props.getOldMessages(chatId);
    }
  }

  render() {
    return templator({
      userId: this.props.userId,
      messages: this.props.messages,
      title: this.title,
      chatClass: this.chatClass,
      userOptionsClass: this.userOptionsClass,
      avatar: this.avatar,
      message: this.state.message,
      deleteChat: this.deleteChat,
      openAddUserModal: this.openAddUserModal,
      openDeleteUserModal: this.openDeleteUserModal,
      openUserOptions: this.openUserOptions,
      sendMessage: this.sendMessage,
      onInputMessage: this.onInputMessage,
      onScrollChat: this.onScrollChat,
    });
  }
}