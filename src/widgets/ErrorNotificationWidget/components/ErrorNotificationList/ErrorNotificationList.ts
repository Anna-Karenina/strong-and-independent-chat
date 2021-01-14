import Component from '@core/component';
import Templator from '@core/templator'
import {IError, IServerError} from '@/types';
import {template} from './error-notification-list.template';

import './ErrorNotificationList.scss';

interface IErrorNotificationListProps {
  errors: IError[],
  removeError: (error: IError) => void;
}

const isServerError = (error: IError): error is IServerError => {
  return (
    !!error &&
    typeof error === 'object' &&
    error.hasOwnProperty('reason')
  );
}

const templator = Templator.compile(template);

export default class ErrorNotificationList extends Component<IErrorNotificationListProps> {
  constructor(props: IErrorNotificationListProps) {
    super(props);
  }

  get errors() {
    return this.props.errors.map((error) => ({
      text: this.getErrorMessage(error),
      remove: () => this.props.removeError(error),
    }))
  }

  getErrorMessage(error: IError) {
    if (!error) {
      return 'Что-то пошло не так :('
    }
    if (isServerError(error)) {
      return error.reason;
    } else if (error.message) {
      return error.message;
    }

    try {
      return JSON.stringify(error);
    } catch (e) {
      return String(error);
    }
  }

  render() {
    return templator({
      errors: this.errors,
    });
  }
}