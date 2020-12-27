import Component from '../../../../core/component/index.js';
import MyButton from '../../../../components/MyButton/index.js';
import Field from '../../../../components/Field/index.js';
import Modal from '../../../../components/Modal/index.js';
import Templator from '../../../../core/templator/index.js';
import { addChatModalTemplate } from './add-chat-modal.template.js';
import { FormValidator, textFiledScheme, } from '../../../../core/validation/index.js';
;
;
const templator = Templator.compile(addChatModalTemplate, {
    components: {
        'my-button': MyButton,
        'modal': Modal,
        'field': Field,
    }
});
export default class AddChatModal extends Component {
    constructor(props) {
        super(props);
        this.onInput = (e) => {
            const target = e.target;
            this.setState({ title: target.value });
        };
        this.onFocusout = (e) => {
            const target = e.target;
            if (target.tagName !== 'INPUT')
                return;
            this.validateTitle(target.value);
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validateTitle(this.state.title);
            if (this.addChatValidator.valid && !this.state.fetching) {
                this.setState({ fetching: true });
                this.props.addChat(this.state.title)
                    .then(this.onClose)
                    .finally(() => this.setState({ fetching: false }));
            }
        };
        this.onClose = () => {
            this.setState({ title: '' });
            this.clearFormState();
            this.props.onClose();
        };
        this.addChatValidator = new FormValidator({
            title: textFiledScheme,
        });
        this.state = {
            title: '',
            formState: this.addChatValidator.formState,
            fetching: false
        };
    }
    clearFormState() {
        this.addChatValidator.clearState();
        this.setState({ formState: this.addChatValidator.formState });
    }
    validateTitle(value) {
        this.addChatValidator.validate('title', value);
        this.setState({ formState: this.addChatValidator.formState });
    }
    render() {
        return templator({
            show: this.props.show,
            title: this.state.title,
            formState: this.state.formState,
            onClose: this.onClose,
            onInput: this.onInput,
            onFocusout: this.onFocusout,
            onSubmit: this.onSubmit,
        });
    }
}
//# sourceMappingURL=AddChatModal.js.map