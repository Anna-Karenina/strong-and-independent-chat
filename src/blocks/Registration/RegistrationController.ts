import Component from '@core/component';
import Templator from '@core/templator';
import {
  FormValidator,
  textFiledScheme,
  emailScheme,
  phoneScheme,
  passwordDuplicateScheme,
  IFormState,
} from '@core/validation';
import Registration from './Registration';
import {authAPI} from '@core/api';
import {bus} from '@core/bus';

interface IRegistrationControllerProps {};

interface IRegistrationFields {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string,
  password: string,
  password_twice: string,
};

interface IRegistrationControllerState {
  fields: IRegistrationFields,
  formState: IFormState,
  fetching: boolean,
};

const templator = Templator.compile(
  `<registration
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
  />`,
  {
    components: {registration: Registration},
  }
);

export default class RegistrationController extends Component<IRegistrationControllerProps, IRegistrationControllerState> {
  private formValidator: FormValidator

  constructor(props: IRegistrationControllerProps) {
    super(props);

    this.formValidator = new FormValidator({
      email: emailScheme,
      login: textFiledScheme,
      first_name: textFiledScheme,
      second_name: textFiledScheme,
      phone: phoneScheme,
      password: textFiledScheme,
      password_twice: passwordDuplicateScheme,
    });

    this.state = {
      fields: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_twice: '',
      },
      formState: this.formValidator.formState,
      fetching: false,
    };
  }
  
  onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const fields = {...this.state.fields, [target.name]: target.value};

    this.setState({fields});
  };
  
  onFocusout = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;
    
    this.formValidator.validate(target.name, target.value, this.state.fields.password);
    this.setState({formState: this.formValidator.formState});
  };
  
  onSubmit = (e: Event) => {
    e.preventDefault();
  
    this.formValidator.validateAll(this.state.fields, {password_twice: [this.state.fields.password]});
    this.setState({formState: this.formValidator.formState});
    
    if (this.formValidator.valid) {
      this.tryToSignup();
    }
  };
  
  tryToSignup = () => {
    if (this.state.fetching) return;

    this.setState({fetching: true});

    authAPI.signup(this.state.fields)
      .then(() => bus.emit('auth:login'))
      .finally(() => this.setState({fetching: false}));
  };

  render() {
    const ctx = {
      formState: this.state.formState,
      fields: this.state.fields,
      onSubmit: this.onSubmit,
      onFocusout: this.onFocusout,
      onInput: this.onInput,
    };

    return templator(ctx);
  }
};