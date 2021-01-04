import Component from '../../core/component/index.js';
import VNode from '../../core/templator/VNode/VNode.js';
import Templator from '../../core/templator/index.js'
import {modalTemplate} from './modal.template.js';
import {classNames as cn} from '../../core/utils/index.js';

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