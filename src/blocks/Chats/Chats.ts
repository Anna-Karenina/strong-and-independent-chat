import Router from '../../core/router/index.js';
import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import Chat from './components/Chat/Chat.js';
import {IChat} from '../../store.js';
import {chatsTemplate} from './chats.template.js';

interface IChatsProps {
  chats: IChat[],
  sendMessage: (e: Event) => any,
};

interface IChatsState extends IState {
  selectedChat: IChat | null,
};

const templator = Templator.compile(chatsTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
    'chat': Chat,
  },
});
export default class Chats extends Component<IChatsProps, IChatsState> {
  private router: Router;

  constructor(props: IChatsProps) {
    super(props);

    this.router = new Router();
    this.state = {
      selectedChat: null,
    };
  }

  get chats() {
    return this.props.chats.map((chat) => ({
      ...chat,
      onClick: () => this.setState({selectedChat: chat})
    }));
  }

  goToProfile = () => {
    this.router.go('/settings');
  }

  render() {
    return templator({
      chats: this.chats,
      selectedChat: this.state.selectedChat,
      sendMessage: this.props.sendMessage,
      goToProfile: this.goToProfile,
    });
  }
};