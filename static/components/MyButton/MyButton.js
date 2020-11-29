import Component from '/core/Component/Component.js';
import Templator from '/core/templator/Templator.js'
import { template } from './my-button.template.js';

const templator = new Templator(template);

export default class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return templator.render(this.props);
  }
}