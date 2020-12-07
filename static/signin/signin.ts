import Signin from '../blocks/Signin/index.js';
import {
  FormValidator,
  textFiledScheme,
  emailScheme,
} from '../core/validation/index.js';
import { render } from '../core/templator/index.js'

let fields = {
  mail: '',
  login: '',
  name: '',
  surname: '',
  phone: '',
  password: '',
  password_twice: '',
};

const signinFormValidator = new FormValidator({
  mail: emailScheme,
  login: textFiledScheme,
  name: textFiledScheme,
  surname: textFiledScheme,
  phone: textFiledScheme,
  password: textFiledScheme,
  password_twice: textFiledScheme,
});


const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  fields = { ...fields, [target.name]: target.value };

  signin.setProps({ fields });
};

const onFocusout = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;

  signinFormValidator.validate(target.name, target.value);
  signin.setProps({ formState: signinFormValidator.formState });
};

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const aggregatedFormData = Object.fromEntries(formData.entries());

  signinFormValidator.validateAll(aggregatedFormData);
  signin.setProps({ formState: signinFormValidator.formState });
  
  if (signinFormValidator.valid) {
    tryToSignin(aggregatedFormData);
  }
};

const tryToSignin = (aggregatedFormData: { [key: string]: any }) => {
  console.log(aggregatedFormData);
};

const signin = new Signin({
  formState: signinFormValidator.formState,
  fields,
  onSubmit,
  onFocusout,
  onInput,
});

render('#app', signin);