import Component from '@core/component';
import Templator from '@core/templator';
import {IMessage} from '@/types';
import {messageTemplate} from './message.template';
import {classNames as cn} from '@core/utils';

interface IMessageProps {
  userId: number,
  message: IMessage,
}

const templator = Templator.compile(messageTemplate);

export default class Message extends Component<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  get content() {
    return this.props.message.content;
  }

  get time() {
    const date = new Date(this.props.message.time);
    const [h, m] = [date.getHours(), date.getMinutes()];

    return `${h}:${m}`;
  }

  get className() {
    const isOwnMessage = this.props.message.user_id === this.props.userId;
    return cn(
      'message',
      {
        'message-sender-me': isOwnMessage,
        'message-sender-interlocutor': !isOwnMessage
      }
    );
  }

  render() {
    return templator({
      content: this.content,
      time: this.time,
      id: this.props.message.id,
      className: this.className,
    });
  }
}