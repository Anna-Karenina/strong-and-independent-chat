import Component from '../../../../core/component/index.js';
import MyButton from '../../../../components/MyButton/index.js';
import Modal from '../../../../components/Modal/index.js';
import Templator from '../../../../core/templator/index.js'
import {avatarModalTemplate} from './avatar-modal.template.js';

interface IAvatarModalProps {
  show: boolean,
  onClose: Function,
  updateAvatar: (formData: FormData) => any,
};

interface IAvatarModalState {
  file: null,
};

const templator = Templator.compile(avatarModalTemplate, {
  components: {
    'my-button': MyButton,
    'modal': Modal,
  }
});

export default class AvatarModal extends Component<IAvatarModalProps, IAvatarModalState> {
  constructor(props: IAvatarModalProps) {
    super(props);
  }

  onSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const avatar: File = formData.get('avatar') as File;

    if (!avatar.size) return;
    this.props.updateAvatar(formData).then(this.props.onClose);
  };

  render() {
    return templator({
      show: this.props.show,
      onClose: this.props.onClose,
      onSubmit: this.onSubmit,
    });
  }
}