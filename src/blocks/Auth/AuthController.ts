import Component from '@core/component';
import Templator from '@core/templator';
import {FormValidator, textFiledScheme, IFormState} from '@core/validation';
import Auth, {IAuthFields} from './Auth';
import {authAPI} from '@core/api';
import {bus} from '@core/bus';

interface IAuthControllerProps {};

interface IAuthControllerState {
  fields: IAuthFields,
  formState: IFormState,
  fetching: boolean,
};

const templator = Templator.compile(
  `<auth
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
  />`,
  {
    components: {auth: Auth},
  }
);

export default class AuthController extends Component<IAuthControllerProps, IAuthControllerState> {
  private authFormValidator: FormValidator

  constructor(props: IAuthControllerProps) {
    super(props);

    this.authFormValidator = new FormValidator({
      login: textFiledScheme,
      password: textFiledScheme,
    });

    this.state = {
      fields: {
        login: '',
        password: '',
      },
      formState: this.authFormValidator.formState,
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
    
    this.authFormValidator.validate(target.name, target.value);
    this.setState({formState: this.authFormValidator.formState});
  };
  
  onSubmit = (e: Event) => {
    e.preventDefault();
  
    this.authFormValidator.validateAll(this.state.fields);
    this.setState({formState: this.authFormValidator.formState});
    
    if (this.authFormValidator.valid) {
      this.tryToAuthorize();
    }
  };
  
  tryToAuthorize = () => {
    if (this.state.fetching) return;

    this.setState({fetching: true});

    authAPI.signin(this.state.fields)
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