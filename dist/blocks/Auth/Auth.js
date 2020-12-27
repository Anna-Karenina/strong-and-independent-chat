import Router from '../../core/router/index.js';
import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import { authTemplate } from './auth.template.js';
;
const templator = Templator.compile(authTemplate, {
    components: {
        'my-button': MyButton,
        'field': Field,
    },
});
export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.goToRegistration = () => {
            this.router.go('/registration');
        };
        this.router = new Router();
    }
    render() {
        return templator({
            ...this.props,
            goToRegistration: this.goToRegistration,
        });
    }
}
;
//# sourceMappingURL=Auth.js.map