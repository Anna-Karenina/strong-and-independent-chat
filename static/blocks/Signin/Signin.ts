import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js';
import MyButton from '../../components/MyButton/index.js';
import Field from '../../components/Field/index.js';
import { IFormState } from '../../core/validation/index.js';
import { signinTemplate } from './signin.template.js';

interface IProps {
  onSubmit: (e: Event) => any,
  onFocusout: (e: Event) => any,
  onInput: (e: Event) => any,
  formState: IFormState,
  fields: { [key: string]: string },
};

export default class Signin extends Component {
  private templator: Templator;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.templator = new Templator(signinTemplate, {
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