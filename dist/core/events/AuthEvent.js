import Event from './Event.js';
import { bus } from '../bus/index.js';
class AuthEvent extends Event {
    constructor() {
        super(...arguments);
        this.onLogout = () => {
            this.router.go('/auth');
        };
        this.onLogin = () => {
            this.router.go('/chats');
        };
    }
    init(opts) {
        this.router = opts.router;
        bus.on('auth:logout', this.onLogout);
        bus.on('auth:login', this.onLogin);
    }
}
export const authEvent = new AuthEvent();
//# sourceMappingURL=AuthEvent.js.map