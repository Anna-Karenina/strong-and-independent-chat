import Router from '@core/router';
import Component from '@core/component';
import Templator from '@core/templator';
import MyButton from '@components/MyButton';
import Field from '@components/Field';
import {IFormState} from '@core/validation';
import {registrationTemplate} from './registration.template';

import './Registration.scss';

interface IProps {
  onSubmit: (e: Event) => void,
  onFocusout: (e: Event) => void,
  onInput: (e: Event) => void,
  formState: IFormState,
  fields: {[key: string]: string},
}

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
}