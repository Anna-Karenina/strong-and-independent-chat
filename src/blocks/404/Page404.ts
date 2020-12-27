import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {template404} from './404.template.js';

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