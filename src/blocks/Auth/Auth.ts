import Component from '../../core/componentV2/index.js';
import Templator from '../../core/templatorV2/index.js';
import MyButton from '../../components/MyButtonV2/index.js';
import Field from '../../components/FieldV2/index.js';
import {IFormState} from '../../core/validation/index.js';
import {authTemplate} from './auth.template.js';

interface IProps {
  onSubmit: (e: Event) => any,
  onFocusout: (e: Event) => any,
  onInput: (e: Event) => any,
  formState: IFormState,
  fields: {[key: string]: string},
};

const templator = Templator.compile(authTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});

export default class Auth extends Component {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return templator(this.props);
  }
};