import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import { registrationTemplate } from './registration.template.js';
;
const templator = Templator.compile(registrationTemplate, {
    components: {
        'my-button': MyButton,
        'field': Field,
    },
});
export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.goToAuth = () => {
            this.router.go('/auth');
        };
        this.router = new Router();
    }
    render() {
        return templator({
            ...this.props,
            goToAuth: this.goToAuth,
        });
    }
}
;
//# sourceMappingURL=Registration.js.map