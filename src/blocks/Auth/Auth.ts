import Router from '../../core/router/index';
import Component from '../../core/component/index';
import Templator from '../../core/templator/index';
import MyButton from '../../components/MyButton/index';
import Field from '../../components/Field/index';
import {IFormState} from '../../core/validation/index';
import {authTemplate} from './auth.template';


export interface IAuthFields {
  login: string,
  password: string,
}

interface IProps {
  onSubmit: (e: Event) => void,
  onFocusout: (e: Event) => void,
  onInput: (e: Event) => void,
  formState: IFormState,
  fields: IAuthFields,
};

const templator = Templator.compile(authTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});

export default class Auth extends Component {
  private router: Router;

  constructor(props: IProps) {
    super(props);

    this.router = new Router();
  }

  goToRegistration = () => {
    this.router.go('/registration');
  }

  render() {
    return templator({
      ...this.props,
      goToRegistration: this.goToRegistration,
    });
  }
};