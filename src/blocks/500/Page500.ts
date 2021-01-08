import Router from '../../core/router/index';
import Component from '../../core/component/index';
import Templator from '../../core/templator/index';
import {template500} from './500.template';

interface IPage500Props {};

const templator = Templator.compile(template500);

export default class Page500 extends Component {
  private router: Router;

  constructor(props: IPage500Props) {
    super(props);

    this.router = new Router();
  }

  goToChats = () => {
    this.router.go('/chats');
  }

  render() {
    return templator({
      goToChats: this.goToChats,
    });
  }
};