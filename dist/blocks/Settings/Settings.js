import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import SettingsField from '../../components/SettingsField/index.js';
import { settingsTemplate } from './settings.template.js';
;
export default class Settings extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.templator = new Templator(settingsTemplate, {
            components: {
                'my-button': MyButton,
                'settings-field': SettingsField,
            },
        });
    }
    render() {
        return this.templator.render(this.props);
    }
}
;
//# sourceMappingURL=Settings.js.map