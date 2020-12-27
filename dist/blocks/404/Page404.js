import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import { template404 } from './404.template.js';
;
const templator = Templator.compile(template404);
export default class Page404 extends Component {
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
//# sourceMappingURL=Page404.js.map