import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template } from './settings-field.template.js';
;
const templator = Templator.compile(template);
export default class SettingsField extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.inputRef = this.element.querySelector('input');
        if (this.inputRef) {
            this.inputRef.value = this.props.value;
        }
    }
    componentDidUpdate() {
        if (this.inputRef) {
            this.inputRef.value = this.props.value;
        }
    }
    render() {
        const { type = 'text', className = '', name = '', label = '', readonly = false, error, value, } = this.props;
        const errorClasses = ['error'];
        const errorText = error || '';
        if (!errorText) {
            errorClasses.push('hidden');
        }
        return templator({
            value,
            type,
            name,
            label,
            readonly,
            errorText,
            errorClassName: errorClasses.join(' '),
            className: ['settings-field', className].join(' ')
        });
    }
}
//# sourceMappingURL=SettingsField.js.map