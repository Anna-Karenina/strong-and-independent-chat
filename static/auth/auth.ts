import Auth from '../blocks/Auth/index.js';
import { FormValidator, textFiledScheme } from '../core/validation/index.js';
import { render } from '../core/templator/index.js'

const authFormValidator = new FormValidator({
  login: textFiledScheme,
  password: textFiledScheme,
});

const onBlur = (e: Event) => {
  const target = e.target as HTMLInputElement;
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
  onBlur,
  onSubmit,
});
render('#app', auth);