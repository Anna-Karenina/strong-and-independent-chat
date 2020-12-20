import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {template404} from './404.template.js';

interface IPage404Props {};

const templator = Templator.compile(template404);

export default class Page404 extends Component {
  constructor(props: IPage404Props) {
    super(props);
  }

  render() {
    return templator(this.props);
  }
};