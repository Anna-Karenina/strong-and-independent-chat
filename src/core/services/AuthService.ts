import Service from './Service';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import {authAPI} from '@core/api'
import {bus} from '@core/bus';

interface IConnectOptions {
  store: Store<IStoreState>,
}

class AuthService extends Service<IConnectOptions> {
  private store: Store<IStoreState>

  connect(opts: IConnectOptions): void {
    this.store = opts.store;
   
    this.fetchUser();
    
    bus.on('auth:logout', this.onLogout);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    bus.on('auth:login', this.onLogin);
  }

  private async fetchUser() {
    try {
      const user = await authAPI.getUser();

      this.store.dispatch('setUser', user);
      this.store.dispatch('setAuthorized', true);
    } catch (e) {
      console.log(e, 'not authorized');
    }
  }

  private onLogout = () => {
    this.store.dispatch('setUser', null);
    this.store.dispatch('setAuthorized', false);
  }

  private onLogin = () => {
    return this.fetchUser();
  }
}

export const authService = new AuthService();
