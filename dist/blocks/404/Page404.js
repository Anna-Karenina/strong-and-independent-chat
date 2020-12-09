import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template404 } from './404.template.js';
;
export default class Page404 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.templator = new Templator(template404);
    }
    render() {
        return this.templator.render(this.props);
    }
}
;
//# sourceMappingURL=Page404.js.map