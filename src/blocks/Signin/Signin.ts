import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import {IFormState} from '../../core/validation/index.js';
import {signinTemplate} from './signin.template.js';

interface IProps {
  onSubmit: (e: Event) => any,
  onFocusout: (e: Event) => any,
  onInput: (e: Event) => any,
  formState: IFormState,
  fields: {[key: string]: string},
};

const templator = Templator.compile(signinTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});

export default class Signin extends Component {
  private router: Router;

  constructor(props: IProps) {
    super(props);

    this.router = new Router();
  }

  goToAuth = () => {
    this.router.go('/auth');
  }

  render() {
    return templator({
      ...this.props,
      goToAuth: this.goToAuth,
    });
  }
};