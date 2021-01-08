import Component from '../../core/component/index';
import VNode from '../../core/templator/VNode/VNode';
import Templator from '../../core/templator/index'
import {modalTemplate} from './modal.template';
import {classNames as cn} from '../../core/utils/index';

interface IModalProps {
  show: boolean,
  onClose: Function,
  $children: VNode[],
};

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