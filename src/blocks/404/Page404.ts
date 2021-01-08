import Router from '../../core/router/index';
import Component from '../../core/component/index';
import Templator from '../../core/templator/index';
import {template404} from './404.template';

interface IPage404Props {};

const templator = Templator.compile(template404);

export default class Page404 extends Component {
  private router: Router;

  constructor(props: IPage404Props) {
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