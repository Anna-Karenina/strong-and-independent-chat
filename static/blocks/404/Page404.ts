import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template404 } from './404.template.js';

interface IPage404Props {};

export default class Page404 extends Component {
  private templator: Templator;

  constructor(props: IPage404Props) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(template404);
  }

  render() {
    return this.templator.render(this.props);
  }
};