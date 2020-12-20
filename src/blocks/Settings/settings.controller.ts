import Settings from './Settings.js';
import {render} from '../../core/templator/index.js'
import {
  FormValidator,
  textFiledScheme,
  emailScheme,
  phoneScheme,
} from '../../core/validation/index.js';
import {modal} from '../../core/utils/index.js';

let fields = {
  mail: '',
  login: '',
  name: '',
  surname: '',
  display_name: '',
  phone: '',
};

const settingsFormValidator = new FormValidator({
  mail: emailScheme,
  login: textFiledScheme,
  name: textFiledScheme,
  surname: textFiledScheme,
  display_name: textFiledScheme,
  phone: phoneScheme,
});

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  fields = {...fields, [target.name]: target.value};
  settings.setProps({fields});
};

const onFocusout = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;
  
  settingsFormValidator.validate(target.name, target.value);
  settings.setProps({formState: settingsFormValidator.formState});
};

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const aggregatedFormData = Object.fromEntries(formData.entries());

  settingsFormValidator.validateAll(aggregatedFormData);
  settings.setProps({formState: settingsFormValidator.formState});
  
  if (settingsFormValidator.valid) {
    tryToAuthorize(aggregatedFormData);
  }
};

const tryToAuthorize = (aggregatedFormData: {[key: string]: any}) => {
  console.log(aggregatedFormData);
};

const settings = new Settings({
  formState: settingsFormValidator.formState,
  fields,
  onSubmit,
  onFocusout,
  onInput,
});

render('#app', settings);

const changeAvatarAction = document.querySelector('.change-avatar-action');
if (changeAvatarAction) {
  const changeAvatarModal = modal('.change-avatar-modal');
  changeAvatarAction.addEventListener('click', changeAvatarModal.open);
}
