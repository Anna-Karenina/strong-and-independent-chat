import Event from './Event';
import Router from '../router/index';
import {bus} from '../bus/index';

interface IAuthEventOpts {
  router: Router,
}

class AuthEvent extends Event {
  private router: Router;

  init(opts: IAuthEventOpts) {
    this.router = opts.router;
    
    bus.on('auth:logout', this.onLogout);
    bus.on('auth:login', this.onLogin);
  }

  private onLogout = () => {
    this.router.go('/auth');
  }

  private onLogin = () => {
    this.router.go('/chats');
  }
}

export const authEvent = new AuthEvent();