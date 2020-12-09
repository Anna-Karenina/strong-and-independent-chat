import Auth from './Auth.js';
import { FormValidator, textFiledScheme } from '../../core/validation/index.js';
import { render } from '../../core/templator/index.js';
let fields = {
    login: '',
    password: '',
};
const authFormValidator = new FormValidator({
    login: textFiledScheme,
    password: textFiledScheme,
});
const onInput = (e) => {
    const target = e.target;
    fields = { ...fields, [target.name]: target.value };
    auth.setProps({ fields });
};
const onFocusout = (e) => {
    const target = e.target;
    if (target.tagName !== 'INPUT')
        return;
    authFormValidator.validate(target.name, target.value);
    auth.setProps({ formState: authFormValidator.formState });
};
const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const aggregatedFormData = Object.fromEntries(formData.entries());
    authFormValidator.validateAll(aggregatedFormData);
    auth.setProps({ formState: authFormValidator.formState });
    if (authFormValidator.valid) {
        tryToAuthorize(aggregatedFormData);
    }
};
const tryToAuthorize = (aggregatedFormData) => {
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
//# sourceMappingURL=auth.controller.js.map