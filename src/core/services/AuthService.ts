import Service from './Service';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import {authAPI} from '@core/api'
import {bus} from '@core/bus';

interface IConnectOptions {
  store: Store<IStoreState>,
};

class AuthService extends Service {
  private store: Store<IStoreState>

  async connect(opts: IConnectOptions) {
    this.store = opts.store;

    this.fetchUser();

    bus.on('auth:logout', this.onLogout);
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
    this.fetchUser();
  }
};

export const authService = new AuthService();
