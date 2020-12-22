import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {
  FormValidator,
  textFiledScheme,
  emailScheme,
  phoneScheme,
  passwordDuplicateScheme,
  IFormState,
} from '../../core/validation/index.js';
import Signin from './Signin.js';
import {authAPI} from '../../core/api/index.js';
import {bus} from '../../core/bus/index.js';

interface ISigninControllerProps {};
interface ISigninFields {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string,
  password: string,
  password_twice: string,
}
interface ISigninControllerState extends IState {
  fields: ISigninFields,
  formState: IFormState,
};

const templator = Templator.compile(
  `<signin
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
  />`,
  {
    components: {signin: Signin},
  }
);

export default class SigninController extends Component<ISigninControllerProps, ISigninControllerState> {
  private formValidator: FormValidator

  constructor(props: ISigninControllerProps) {
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
    authAPI.signup(this.state.fields)
      .then(() => bus.emit('auth:login'));
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