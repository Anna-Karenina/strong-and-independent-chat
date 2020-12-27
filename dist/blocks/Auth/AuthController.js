import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { FormValidator, textFiledScheme } from '../../core/validation/index.js';
import Auth from './Auth.js';
import { authAPI } from '../../core/api/index.js';
import { bus } from '../../core/bus/index.js';
;
;
const templator = Templator.compile(`<auth
    :formState="formState"
    :fields="fields"
    :onSubmit="onSubmit"
    :onFocusout="onFocusout"
    :onInput="onInput"
  />`, {
    components: { auth: Auth },
});
export default class AuthController extends Component {
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
            this.authFormValidator.validate(target.name, target.value);
            this.setState({ formState: this.authFormValidator.formState });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.authFormValidator.validateAll(this.state.fields);
            this.setState({ formState: this.authFormValidator.formState });
            if (this.authFormValidator.valid) {
                this.tryToAuthorize();
            }
        };
        this.tryToAuthorize = () => {
            if (this.state.fetching)
                return;
            this.setState({ fetching: true });
            authAPI.signin(this.state.fields)
                .then(() => bus.emit('auth:login'))
                .finally(() => this.setState({ fetching: false }));
        };
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
//# sourceMappingURL=AuthController.js.map