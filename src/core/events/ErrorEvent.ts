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

    window.onerror = this.onError;
    window.onunhandledrejection = this.onPromiseReject;
  }

  private onError = (error: any) => {
    bus.emit('notification:error', error);
    return false;
  }

  private onPromiseReject = (error: PromiseRejectionEvent) => {
    bus.emit('notification:error', error.reason);
    return false;
  }
}

export const errorEvent = new ErrorEvent();