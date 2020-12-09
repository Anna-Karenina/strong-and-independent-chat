import Component, {IProps} from '../../core/Component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './my-button.template.js';

export default class MyButton extends Component {
  private templator: Templator;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(template);
  }

  render() {
    return this.templator.render(this.props);
  }
}