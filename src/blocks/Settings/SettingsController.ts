import Component, {IState} from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import {
  FormValidator,
  textFiledScheme,
  emailScheme,
  phoneScheme,
  IFormState,
} from '../../core/validation/index.js';
import Settings from './Settings.js';
import {bus} from '../../core/bus/index.js';
import {authAPI} from '../../core/api/index.js';

interface ISettingsControllerProps {};

interface ISettingsControllerState extends IState {
  fields: Record<string, string>,
  formState: IFormState,
};

const templator = Templator.compile(
  `<settings
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
    :onLogout="onLogout"
  />`,
  {
    components: {settings: Settings},
  }
);

export default class SettingsController extends Component<ISettingsControllerProps, ISettingsControllerState> {
  private formValidator: FormValidator

  constructor(props: ISettingsControllerProps) {
    super(props);

    this.formValidator = new FormValidator({
      mail: emailScheme,
      login: textFiledScheme,
      name: textFiledScheme,
      surname: textFiledScheme,
      display_name: textFiledScheme,
      phone: phoneScheme,
    });

    this.state = {
      fields: {
        mail: '',
        login: '',
        name: '',
        surname: '',
        display_name: '',
        phone: '',
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
    
    this.formValidator.validate(target.name, target.value);
    this.setState({formState: this.formValidator.formState});
  };
  
  onSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const aggregatedFormData = Object.fromEntries(formData.entries());
  
    this.formValidator.validateAll(aggregatedFormData);
    this.setState({formState: this.formValidator.formState});
    
    if (this.formValidator.valid) {
      this.tryToSave(aggregatedFormData);
    }
  };
  
  tryToSave = (aggregatedFormData: {[key: string]: any}) => {
    console.log(aggregatedFormData);
  };

  onLogout = () => {
    authAPI
      .logout()
      .then(() => bus.emit('auth:logout'));
  };

  render() {
    const ctx = {
      formState: this.state.formState,
      fields: this.state.fields,
      onSubmit: this.onSubmit,
      onFocusout: this.onFocusout,
      onInput: this.onInput,
      onLogout: this.onLogout,
    };

    return templator(ctx);
  }
};