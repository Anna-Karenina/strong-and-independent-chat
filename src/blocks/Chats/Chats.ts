import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import {chatsTemplate} from './chats.template.js';

interface IChatsProps {
  newUserLogin: string,
  search: string,
  onSubmit: (e: Event) => any,
  onNewUserLoginInput: (e: Event) => any,
  onSearch: (e: Event) => any,
};

const templator = Templator.compile(chatsTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});
export default class Chats extends Component {
  constructor(props: IChatsProps) {
    super(props);
  }

  render() {
    return templator(this.props);
  }
};