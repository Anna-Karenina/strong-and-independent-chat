import Component, { IProps } from '../../core/Component/Component.js';
import Templator from '../../core/templator/index.js'
import { template } from './my-button.template.js';

export default class MyButton extends Component {
  private _templator: Templator;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this._templator = new Templator(template);
  }

  render() {
    return this._templator.render(this.props);
  }
}