import Component from '@core/component';
import VNode from '@core/templator/VNode/VNode';
import Templator from '@core/templator'
import {modalTemplate} from './modal.template';
import {classNames as cn} from '@core/utils';

import './Modal.scss';

interface IModalProps {
  show: boolean,
  onClose: () => void,
  $children: VNode[],
}

const templator = Templator.compile(modalTemplate);

export default class Modal extends Component<IModalProps> {
  constructor(props: IModalProps) {
    super(props);
  }

  onModalClick = (e: InputEvent) => {
    if (this.element === e.target) {
      this.props?.onClose();
    }
  }

  render() {
    const {show} = this.props;

    return templator({
      $children: this.props.$children,
      className: cn('modal', {'modal-show': show}),
      onModalClick: this.onModalClick,
    });
  }
}