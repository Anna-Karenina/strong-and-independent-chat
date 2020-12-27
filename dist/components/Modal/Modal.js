import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { modalTemplate } from './modal.template.js';
;
const templator = Templator.compile(modalTemplate);
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.onModalClick = (e) => {
            var _a;
            if (this.element === e.target) {
                (_a = this.props) === null || _a === void 0 ? void 0 : _a.onClose();
            }
        };
    }
    render() {
        const { show } = this.props;
        const classes = ['modal'];
        if (show) {
            classes.push('modal-show');
        }
        return templator({
            $children: this.props.$children,
            className: classes.join(' '),
            onModalClick: this.onModalClick,
        });
    }
}
//# sourceMappingURL=Modal.js.map