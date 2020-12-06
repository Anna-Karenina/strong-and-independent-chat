import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import { authTemplate } from './auth.template.js';

interface IProps {
  onSubmit: (e: Event) => any,
};

export default class Auth extends Component {
  private templator: Templator;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(authTemplate, {
      components: {
        'my-button': MyButton,
        'field': Field,
      },
    });
  }

  render() {
    return this.templator.render(this.props);
  }
};