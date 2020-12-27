import Component from '../../../../core/component/index.js';
import MyButton from '../../../../components/MyButton/index.js';
import Modal from '../../../../components/Modal/index.js';
import Templator from '../../../../core/templator/index.js';
import { avatarModalTemplate } from './avatar-modal.template.js';
;
;
const templator = Templator.compile(avatarModalTemplate, {
    components: {
        'my-button': MyButton,
        'modal': Modal,
    }
});
export default class AvatarModal extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const avatar = formData.get('avatar');
            if (!avatar.size || this.state.fetching)
                return;
            this.setState({ fetching: true });
            this.props.updateAvatar(formData)
                .then(this.onClose)
                .finally(() => this.setState({ fetching: false }));
        };
        this.onInput = (e) => {
            const target = e.target;
            if (!target.files)
                return;
            const [file] = [...target.files];
            this.setState({ file });
        };
        this.onClose = () => {
            this.setState({ file: null });
            this.props.onClose();
        };
        this.state = {
            file: null,
            fetching: false,
        };
    }
    get fileName() {
        var _a;
        return ((_a = this.state.file) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    get labelClass() {
        const defaultClass = 'input-file__label';
        return this.state.file ? `${defaultClass} hidden` : defaultClass;
    }
    render() {
        return templator({
            show: this.props.show,
            onClose: this.onClose,
            file: this.state.file,
            fileName: this.fileName,
            labelClass: this.labelClass,
            onSubmit: this.onSubmit,
            onInput: this.onInput,
        });
    }
}
//# sourceMappingURL=AvatarModal.js.map