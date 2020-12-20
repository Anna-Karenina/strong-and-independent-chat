import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {template} from './my-button.template.js';

interface IMyButtonProps {
  text?: string,
  className?: string,
  type?: string,
  onClick?: Function,
};

const templator = Templator.compile(template);

export default class MyButton extends Component {
  constructor(props: IMyButtonProps) {
    super(props);
  }

  emptyClickHandler() {}

  render() {
    const {text = '', className = '', type = '', onClick} = this.props;

    return templator({
      text,
      type,
      className: `primary-button ${className}`,
      onClick: onClick || this.emptyClickHandler,
    });
  }
}