import Service from './Service.js';
import { authAPI } from '../api/index.js';
import { bus } from '../bus/index.js';
;
class AuthService extends Service {
    constructor() {
        super(...arguments);
        this.onLogout = () => {
            this.store.dispatch('setUser', null);
            this.store.dispatch('setAuthorized', false);
        };
        this.onLogin = () => {
            this.fetchUser();
        };
    }
    async connect(opts) {
        this.store = opts.store;
        this.fetchUser();
        bus.on('auth:logout', this.onLogout);
        bus.on('auth:login', this.onLogin);
    }
    async fetchUser() {
        try {
            const user = await authAPI.getUser();
            this.store.dispatch('setUser', user);
            this.store.dispatch('setAuthorized', true);
        }
        catch (e) {
            console.log(e, 'not authorized');
        }
    }
}
;
export const authService = new AuthService();
//# sourceMappingURL=AuthService.js.map