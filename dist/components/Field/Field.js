import Component from '../../core/Component/index.js';
import Templator from '../../core/templator/index.js';
import { template } from './field.template.js';
;
export default class Field extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.templator = new Templator(template);
    }
    render() {
        const errorClasses = ['error', 'field__error'];
        const errorText = this.props.error || '';
        if (!errorText) {
            errorClasses.push('hidden');
        }
        return this.templator.render({
            ...this.props,
            errorText,
            errorClassName: errorClasses.join(' '),
        });
    }
}
//# sourceMappingURL=Field.js.map