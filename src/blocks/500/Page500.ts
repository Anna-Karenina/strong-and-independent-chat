import Component from '../../core/componentV2/index.js';
import Templator from '../../core/templatorV2/index.js';
import {template500} from './500.template.js';

interface IPage500Props {};

const templator = Templator.compile(template500);

export default class Page500 extends Component {
  constructor(props: IPage500Props) {
    super(props);
  }

  render() {
    return templator(this.props);
  }
};