import Component from '../../core/componentV2/index.js';
import Templator from '../../core/templatorV2/index.js';
import MyButton from '../../components/MyButtonV2/index.js';
import Field from '../../components/FieldV2/index.js';
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