import Router from '@core/router';
import Component from '@core/component';
import Templator from '@core/templator';
import MyButton from '@components/MyButton';
import Field from '@components/Field';
import {IFormState} from '@core/validation';
import {authTemplate} from './auth.template';

import './auth.scss';

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
}

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
}