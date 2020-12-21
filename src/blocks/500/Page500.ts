import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {template500} from './500.template.js';

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