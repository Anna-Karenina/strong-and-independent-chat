import Router from '../../core/router/index';
import Component from '../../core/component/index';
import Templator from '../../core/templator/index';
import MyButton from '../../components/MyButton/index';
import Field from '../../components/Field/index';
import {IFormState} from '../../core/validation/index';
import {registrationTemplate} from './registration.template';

interface IProps {
  onSubmit: (e: Event) => any,
  onFocusout: (e: Event) => any,
  onInput: (e: Event) => any,
  formState: IFormState,
  fields: {[key: string]: string},
};

const templator = Templator.compile(registrationTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});

export default class Registration extends Component {
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