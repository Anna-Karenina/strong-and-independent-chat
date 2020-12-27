import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {avatarTemplate} from './avatar.template.js';
import {HOST} from '../../core/http/index.js';

interface IAvatarProps {
  img: string | null,
  className?: string,
};

const templator = Templator.compile(avatarTemplate);

export default class Avatar extends Component<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
  }

  get imagePath() {
    const {img} = this.props;
    return img ? `${HOST}${img}` : '';
  }

  get style() {
    if (!this.imagePath) return '';
    return `background-image: url("${this.imagePath}")`;
  }

  get className() {
    const {className = ''} = this.props;
    return `avatar ${className}`;
  }

  render() {
    return templator({
      style: this.style,
      className: this.className,
    });
  }
}