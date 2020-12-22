import Event from './Event.js';
import Router from '../router/index.js';
import {bus} from '../bus/index.js';

interface IAuthEventOpts {
  router: Router,
}

class AuthEvent extends Event {
  init(opts: IAuthEventOpts) {
    const {router} = opts;
    
    bus.on('auth:logout', () => {
      router.go('/auth');
    })
  }
}

export const authEvent = new AuthEvent();