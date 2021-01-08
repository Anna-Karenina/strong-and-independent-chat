import Component from '@core/component';
import Templator from '@core/templator/index'
import {avatarTemplate} from './avatar.template';
import {HOST} from '@core/http/index';
import {classNames as cn} from '@core/utils/index';

import './Avatar.scss';

interface IAvatarProps {
  img: string | null,
  className?: string,
}

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