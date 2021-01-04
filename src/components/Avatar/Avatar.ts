import Component from '../../core/component/index.js';
import Templator from '../../core/templator/index.js'
import {avatarTemplate} from './avatar.template.js';
import {HOST} from '../../core/http/index.js';
import {classNames as cn} from '../../core/utils/index.js';

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

  render() {
    return templator({
      avatar: this.imagePath,
      className: cn('avatar', this.props.className),
    });
  }
}