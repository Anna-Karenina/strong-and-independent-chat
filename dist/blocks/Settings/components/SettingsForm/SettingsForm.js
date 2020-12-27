import Component from '../../../../core/component/index.js';
import Templator from '../../../../core/templator/index.js';
import MyButton from '../../../../components/MyButton/index.js';
import SettingsField from '../../../../components/SettingsField/index.js';
import { settingsPreviewTemplate } from './settings-preview.template.js';
import { settingsProfileTemplate } from './settings-profile.template.js';
import { settingsPasswordTemplate } from './settings-password.template.js';
import { EDIT_TARGET } from '../../types/index.js';
import { isEqual } from '../../../../core/utils/index.js';
import { FormValidator, textFiledScheme, emailScheme, phoneScheme, passwordDuplicateScheme, } from '../../../../core/validation/index.js';
;
;
const previewTemplator = Templator.compile(settingsPreviewTemplate, {
    components: {
        'settings-field': SettingsField,
    },
});
const profileTemplator = Templator.compile(settingsProfileTemplate, {
    components: {
        'my-button': MyButton,
        'settings-field': SettingsField,
    },
});
const passwordTemplator = Templator.compile(settingsPasswordTemplate, {
    components: {
        'my-button': MyButton,
        'settings-field': SettingsField,
    },
});
export default class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.editProfile = () => {
            this.props.setEditTarget(EDIT_TARGET.PROFILE);
        };
        this.editPassword = () => {
            this.props.setEditTarget(EDIT_TARGET.PASSWORD);
        };
        this.onProfileFieldInput = (e) => {
            const target = e.target;
            const profileFields = { ...this.state.profileFields, [target.name]: target.value };
            this.setState({ profileFields });
        };
        this.onPasswordFieldInput = (e) => {
            const target = e.target;
            const passwordFields = { ...this.state.passwordFields, [target.name]: target.value };
            this.setState({ passwordFields });
        };
        this.onFocusout = (e) => {
            const target = e.target;
            if (target.tagName !== 'INPUT')
                return;
            this.validator.validate(target.name, target.value, this.state.passwordFields.newPassword);
            this.setState({ formState: this.validator.formState });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const fields = this.props.editTarget === EDIT_TARGET.PASSWORD
                ? this.state.passwordFields
                : this.state.profileFields;
            this.validator.validateAll(fields, { newPasswordTwice: [this.state.passwordFields.newPassword] });
            this.setState({ formState: this.validator.formState });
            if (this.validator.valid) {
                this.updateProfileOrPassword();
            }
        };
        const profileFields = {
            email: '',
            login: '',
            first_name: '',
            second_name: '',
            display_name: '',
            phone: '',
        };
        const passwordFields = {
            oldPassword: '',
            newPassword: '',
            newPasswordTwice: '',
        };
        this.profileValidator = new FormValidator({
            email: emailScheme,
            login: textFiledScheme,
            first_name: textFiledScheme,
            second_name: textFiledScheme,
            display_name: textFiledScheme,
            phone: phoneScheme,
        });
        this.passwordValidator = new FormValidator({
            oldPassword: textFiledScheme,
            newPassword: textFiledScheme,
            newPasswordTwice: passwordDuplicateScheme,
        });
        this.state = {
            profileFields,
            passwordFields,
            formState: this.validator.formState,
            fetching: false,
        };
        this.setProfileFieldsFromUser();
    }
    get validator() {
        return this.props.editTarget === EDIT_TARGET.PROFILE
            ? this.profileValidator
            : this.passwordValidator;
    }
    componentDidUpdate(oldProps) {
        if (!isEqual(oldProps.user, this.props.user)) {
            this.setProfileFieldsFromUser();
        }
        if (oldProps.editTarget !== this.props.editTarget) {
            this.setProfileFieldsFromUser();
            this.clearPasswordFields();
            this.setFormState();
        }
    }
    setProfileFieldsFromUser() {
        const { user } = this.props;
        const profileFields = Object
            .keys(this.state.profileFields)
            .reduce((acc, field) => {
            const value = (user && user[field]) || '';
            return { ...acc, [field]: value };
        }, {});
        this.setState({ profileFields });
    }
    clearPasswordFields() {
        const passwordFields = Object
            .keys(this.state.passwordFields)
            .reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        this.setState({ passwordFields });
    }
    setFormState() {
        this.validator.clearState();
        this.setState({ formState: this.validator.formState });
    }
    updateProfileOrPassword() {
        if (!this.props.editTarget || this.state.fetching)
            return;
        this.setState({ fetching: true });
        const updateMap = {
            [EDIT_TARGET.PROFILE]: () => this.props.updateProfile(this.state.profileFields),
            [EDIT_TARGET.PASSWORD]: () => this.props.updatePassword({
                newPassword: this.state.passwordFields.newPassword,
                oldPassword: this.state.passwordFields.oldPassword,
            }),
        };
        const update = updateMap[this.props.editTarget];
        return update()
            .then(() => this.props.setEditTarget(null))
            .finally(() => this.setState({ fetching: false }));
    }
    render() {
        if (!this.props.editTarget) {
            return previewTemplator({
                onLogout: this.props.onLogout,
                fields: this.state.profileFields,
                editProfile: this.editProfile,
                editPassword: this.editPassword,
            });
        }
        return this.props.editTarget === EDIT_TARGET.PROFILE
            ? profileTemplator({
                fields: this.state.profileFields,
                formState: this.validator.formState,
                onInput: this.onProfileFieldInput,
                onFocusout: this.onFocusout,
                onSubmit: this.onSubmit,
            })
            : passwordTemplator({
                fields: this.state.passwordFields,
                formState: this.validator.formState,
                onInput: this.onPasswordFieldInput,
                onFocusout: this.onFocusout,
                onSubmit: this.onSubmit,
            });
    }
}
;
//# sourceMappingURL=SettingsForm.js.map