import { http } from '../http/index.js';
import BaseAPI from './BaseAPI.js';
export default class AuthAPI extends BaseAPI {
    signup(data) {
        return http.post('/auth/signup', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    signin(data) {
        return http.post('/auth/signin', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    getUser() {
        return http.get('/auth/user', {
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    logout() {
        return http.post('/auth/logout');
    }
}
export const authAPI = new AuthAPI();
//# sourceMappingURL=AuthAPI.js.map