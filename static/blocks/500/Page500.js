import Component from '/core/component/index.js';
import Templator from '/core/templator/index.js';
import { template500 } from './500.template.js';

export default class Page500 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._templator = new Templator(template500);
  }

  render() {
    return this._templator.render(this.props);
  }
};