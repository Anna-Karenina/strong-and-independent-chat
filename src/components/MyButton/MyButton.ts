import Component from '@core/component';
import Templator from '@core/templator'
import {template} from './my-button.template';
import {classNames as cn} from '@core/utils';

import './MyButton.scss';

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
      className: cn('primary-button', className),
      onClick: onClick || this.emptyClickHandler,
    });
  }
}