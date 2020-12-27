import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template500 } from './500.template.js';
;
const templator = Templator.compile(template500);
export default class Page500 extends Component {
    constructor(props) {
        super(props);
        this.goToChats = () => {
            this.router.go('/chats');
        };
        this.router = new Router();
    }
    render() {
        return templator({
            goToChats: this.goToChats,
        });
    }
}
;
//# sourceMappingURL=Page500.js.map