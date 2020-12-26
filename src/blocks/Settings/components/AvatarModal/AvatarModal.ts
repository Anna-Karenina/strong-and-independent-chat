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
  file: File | null,
  fetching: boolean,
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

    this.state = {
      file: null,
      fetching: false,
    };
  }

  get fileName() {
    return this.state.file?.name || '';
  }

  get labelClass() {
    const defaultClass = 'input-file__label';
    return this.state.file ? `${defaultClass} hidden` : defaultClass; 
  }

  onSubmit = (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const avatar: File = formData.get('avatar') as File;

    if (!avatar.size || this.state.fetching) return;

    this.setState({fetching: true});
    this.props.updateAvatar(formData)
      .then(this.onClose)
      .finally(() => this.setState({fetching: false}));
  };

  onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const [file] = [...target.files]
    this.setState({file});
  }

  onClose = () => {
    this.setState({file: null});
    this.props.onClose();
  }

  render() {
    return templator({
      show: this.props.show,
      onClose: this.onClose,
      file: this.state.file,
      fileName: this.fileName,
      labelClass: this.labelClass,
      onSubmit: this.onSubmit,
      onInput: this.onInput,
    });
  }
}