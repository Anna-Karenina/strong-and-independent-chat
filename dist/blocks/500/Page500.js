import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template500 } from './500.template.js';
;
export default class Page500 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.templator = new Templator(template500);
    }
    render() {
        return this.templator.render(this.props);
    }
}
;
//# sourceMappingURL=Page500.js.map