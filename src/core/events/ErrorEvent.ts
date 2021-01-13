import Event from './Event';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import {bus} from '@core/bus';

interface IErrorEventOpts {
  store: Store<IStoreState>,
}

class ErrorEvent extends Event<IErrorEventOpts> {
  private store: Store<IStoreState>;

  init(opts: IErrorEventOpts) {
    this.store = opts.store;
    
    bus.on('notification:error', (error) => {
      this.store.dispatch('pushError', error);
    });
  }
}

export const errorEvent = new ErrorEvent();