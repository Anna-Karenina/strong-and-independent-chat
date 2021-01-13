import {render} from '@core/templator';
import {IError} from '@/types';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import ErrorNotificationList from './components/ErrorNotificationList/ErrorNotificationList';

interface IOptions {
  store: Store<IStoreState>,
}

export default class ErrorNotificationWidget {
  private store: Store<IStoreState>;

  private errorNotificationList: ErrorNotificationList;

  constructor(opts: IOptions) {
    this.store = opts.store;
  }

  start(rootQuery: string) {
    const {state} = this.store.select(['errors'], (_, errors: IError[]) => this.updateView(errors));

    this.errorNotificationList = new ErrorNotificationList({
      errors: [],
      removeError: this.removeError,
    });
    render(rootQuery, this.errorNotificationList);

    this.updateView(state.errors || []);
  }

  private removeError = (error: IError) => {
    this.store.dispatch('removeError', error);
  }

  private updateView(errors: IError[]) {
    this.errorNotificationList.setProps({errors, removeError: this.removeError,});
  }
}