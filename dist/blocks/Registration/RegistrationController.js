import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { FormValidator, textFiledScheme, emailScheme, phoneScheme, passwordDuplicateScheme, } from '../../core/validation/index.js';
import Registration from './Registration.js';
import { authAPI } from '../../core/api/index.js';
import { bus } from '../../core/bus/index.js';
;
;
;
const templator = Templator.compile(`<registration
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
  />`, {
    components: { registration: Registration },
});
export default class RegistrationController extends Component {
    constructor(props) {
        super(props);
        this.onInput = (e) => {
            const target = e.target;
            const fields = { ...this.state.fields, [target.name]: target.value };
            this.setState({ fields });
        };
        this.onFocusout = (e) => {
            const target = e.target;
            if (target.tagName !== 'INPUT')
                return;
            this.formValidator.validate(target.name, target.value, this.state.fields.password);
            this.setState({ formState: this.formValidator.formState });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.formValidator.validateAll(this.state.fields, { password_twice: [this.state.fields.password] });
            this.setState({ formState: this.formValidator.formState });
            if (this.formValidator.valid) {
                this.tryToSignup();
            }
        };
        this.tryToSignup = () => {
            if (this.state.fetching)
                return;
            this.setState({ fetching: true });
            authAPI.signup(this.state.fields)
                .then(() => bus.emit('auth:login'))
                .finally(() => this.setState({ fetching: false }));
        };
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
}
;
//# sourceMappingURL=RegistrationController.js.map