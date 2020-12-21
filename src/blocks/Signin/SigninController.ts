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

interface ISigninControllerProps {};

interface ISigninControllerState extends IState {
  fields: Record<string, string>,
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
      mail: emailScheme,
      login: textFiledScheme,
      name: textFiledScheme,
      surname: textFiledScheme,
      phone: phoneScheme,
      password: textFiledScheme,
      password_twice: passwordDuplicateScheme,
    });

    this.state = {
      fields: {
        mail: '',
        login: '',
        name: '',
        surname: '',
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
    const formData = new FormData(e.target as HTMLFormElement);
    const aggregatedFormData = Object.fromEntries(formData.entries());
  
    this.formValidator.validateAll(aggregatedFormData, {password_twice: [this.state.fields.password]});
    this.setState({formState: this.formValidator.formState});
    
    if (this.formValidator.valid) {
      this.tryToSignin(aggregatedFormData);
    }
  };
  
  tryToSignin = (aggregatedFormData: {[key: string]: any}) => {
    console.log(aggregatedFormData);
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