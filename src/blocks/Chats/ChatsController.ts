import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Chats from './Chats.js';
import {store, IChat} from '../../store.js';
import {chatsAPI} from '../../core/api/index.js';

interface IChatsControllerProps {};

interface IChatsControllerState extends IState {
  chats: IChat[]
};

const templator = Templator.compile(
  `<chats
    :sendMessage="sendMessage",
    :chats="chats"
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

  async componentDidMount() {
    const chats = await chatsAPI.getChats();
    store.dispatch('setChats', chats);
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

  render() {
    return templator({
      chats: this.state.chats,
      sendMessage: this.sendMessage,
    });
  }
};