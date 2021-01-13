import Component from '@core/component';
import Templator from '@core/templator'
import {template} from './error-notification-list.template';
// import {classNames as cn} from '@core/utils';

import './ErrorNotificationList.scss';

interface IErrorNotificationListProps {
  errors: any[],
}

const templator = Templator.compile(template);

export default class ErrorNotificationList extends Component<IErrorNotificationListProps> {
  constructor(props: IErrorNotificationListProps) {
    super(props);
  }

  render() {
    return templator({
      errors: this.props.errors,
    });
  }
}