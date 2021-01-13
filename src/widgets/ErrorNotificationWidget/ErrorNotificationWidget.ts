import {render} from '@core/templator';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import ErrorNotificationList from './components/ErrorNotificationList/ErrorNotificationList';
// import {bus} from '@core/bus';

interface IOptions {
  store: Store<IStoreState>,
}

export default class ErrorNotificationWidget {
  // private store: Store<IStoreState>;
  store: Store<IStoreState>;

  constructor(opts: IOptions) {
    this.store = opts.store;
  }

  start(rootQuery: string) {
    const errorNotificationList = new ErrorNotificationList({errors: []});
    render(rootQuery, errorNotificationList);
  }
}