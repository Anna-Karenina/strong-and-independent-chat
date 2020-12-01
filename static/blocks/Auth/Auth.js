import Component from '/core/component/index.js';
import Templator from '/core/templator/index.js';
import MyButton from '/components/MyButton/index.js';
import { authTemplate } from './auth.template.js';

const templator = new Templator(authTemplate, {
  components: {
    'my-button': MyButton
  },
});

export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return templator.render(this.props);
  }
};