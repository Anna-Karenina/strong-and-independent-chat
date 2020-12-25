import Component from '../../../../core/component/index.js';
import Templator from '../../../../core/templator/index.js';
import {IChat} from '../../../../store.js';
import {chatTemplate} from './chat.template.js';

interface IChatsProps {
  chat: IChat | null,
  sendMessage: (e: Event) => any,
};

const templator = Templator.compile(chatTemplate);

export default class Chat extends Component<IChatsProps> {
  constructor(props: IChatsProps) {
    super(props);
  }

  get chatClass() {
    const classes = ['chat'];

    if (!this.props.chat) {
      classes.push('hidden');
    }

    return classes.join(' ');
  }

  get title() {
    const {chat} = this.props;
    return chat && chat.title || '';
  }

  render() {
    return templator({
      title: this.title,
      chatClass: this.chatClass,
      sendMessage: this.props.sendMessage,
    });
  }
};