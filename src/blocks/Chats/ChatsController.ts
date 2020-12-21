import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import Chats from './Chats.js';

interface IChatsControllerProps {};

interface IChatsControllerState extends IState {
  newUserLogin: '',
  search: '',
};

const templator = Templator.compile(
  `<chats
    :newUserLogin="newUserLogin",
    :search="search",
    :onSubmit="onSubmit",
    :onSearch="onSearch",
    :onNewUserLoginInput="onNewUserLoginInput",
  />`,
  {
    components: {chats: Chats},
  }
);

export default class ChatsController extends Component<IChatsControllerProps, IChatsControllerState> {
  constructor(props: IChatsControllerProps) {
    super(props);

    this.state = {
      newUserLogin: '',
      search: '',
    };
  }

  onNewUserLoginInput = (e: Event) => {
    const target = e.target as HTMLFormElement;

    this.setState({newUserLogin: target.value});
  };
  
  onSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const aggregatedFormData = Object.fromEntries(formData.entries());
    console.log(aggregatedFormData);
  };
  
  onSearch = (e: Event) => {
    const target = e.target as HTMLFormElement;
    this.setState({search: target.value});
  };

  render() {
    const ctx = {
      newUserLogin: this.state.newUserLogin,
      search: this.state.search,
      onSubmit: this.onSubmit,
      onSearch: this.onSearch,
      onNewUserLoginInput: this.onNewUserLoginInput,
    };

    return templator(ctx);
  }
};