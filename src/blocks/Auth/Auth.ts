import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import {IFormState} from '../../core/validation/index.js';
import {authTemplate} from './auth.template.js';


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