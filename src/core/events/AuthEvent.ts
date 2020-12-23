import Event from './Event.js';
import Router from '../router/index.js';
import {bus} from '../bus/index.js';

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