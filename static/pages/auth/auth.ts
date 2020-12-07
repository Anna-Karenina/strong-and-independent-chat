import Auth from '../../blocks/Auth/index.js';
import { FormValidator, textFiledScheme } from '../../core/validation/index.js';
import { render } from '../../core/templator/index.js'

let fields = {
  login: '',
  password: '',
};

const authFormValidator = new FormValidator({
  login: textFiledScheme,
  password: textFiledScheme,
});

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  fields = { ...fields, [target.name]: target.value };
  auth.setProps({ fields });
};

const onFocusout = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;
  
  authFormValidator.validate(target.name, target.value);
  auth.setProps({ formState: authFormValidator.formState });
};

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const aggregatedFormData = Object.fromEntries(formData.entries());

  authFormValidator.validateAll(aggregatedFormData);
  auth.setProps({ formState: authFormValidator.formState });
  
  if (authFormValidator.valid) {
    tryToAuthorize(aggregatedFormData);
  }
};

const tryToAuthorize = (aggregatedFormData: { [key: string]: any }) => {
  console.log(aggregatedFormData);
};

const auth = new Auth({
  formState: authFormValidator.formState,
  fields,
  onSubmit,
  onFocusout,
  onInput,
});

render('#app', auth);