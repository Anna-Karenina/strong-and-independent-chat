import Component from '/core/component/index.js';
import Templator from '/core/templator/index.js';
import MyButton from '/components/MyButton/index.js';
import { settingsTemplate } from './settings.template.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._templator = new Templator(settingsTemplate, {
      components: {
        'my-button': MyButton,
      },
    });
  }

  render() {
    return this._templator.render(this.props);
  }
};