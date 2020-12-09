import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {template500} from './500.template.js';

interface IPage500Props {};

export default class Page500 extends Component {
  private templator: Templator;

  constructor(props: IPage500Props) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(template500);
  }

  render() {
    return this.templator.render(this.props);
  }
};