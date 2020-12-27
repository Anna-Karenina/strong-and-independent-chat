import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template } from './my-button.template.js';
;
const templator = Templator.compile(template);
export default class MyButton extends Component {
    constructor(props) {
        super(props);
    }
    emptyClickHandler() { }
    render() {
        const { text = '', className = '', type = '', onClick } = this.props;
        return templator({
            text,
            type,
            className: `primary-button ${className}`,
            onClick: onClick || this.emptyClickHandler,
        });
    }
}
//# sourceMappingURL=MyButton.js.map