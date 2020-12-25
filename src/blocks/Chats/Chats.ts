import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import {IChat} from '../../store.js';
import {chatsTemplate} from './chats.template.js';

interface IChatsProps {
  chats: IChat[],
  onSubmit: (e: Event) => any,
};

const templator = Templator.compile(chatsTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});
export default class Chats extends Component {
  private router: Router;

  constructor(props: IChatsProps) {
    super(props);

    this.router = new Router();
  }

  goToProfile = () => {
    this.router.go('/settings');
  }

  render() {
    return templator({
      chats: this.props.chats,
      onSubmit: this.props.onSubmit,
      goToProfile: this.goToProfile,
    });
  }
};