import Component from '../../core/component/index.js';
import VNode from '../../core/templator/VNode/VNode.js';
import Templator from '../../core/templator/index.js'
import {modalTemplate} from './modal.template.js';

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
    const classes = ['modal'];

    if (show) {
      classes.push('modal-show');
    }

    return templator({
      $children: this.props.$children,
      className: classes.join(' '),
      onModalClick: this.onModalClick,
    });
  }
}