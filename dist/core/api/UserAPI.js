import { http } from '../http/index.js';
import BaseAPI from './BaseAPI.js';
export default class UserAPI extends BaseAPI {
    search(data) {
        return http.post('/user/search', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
export const userAPI = new UserAPI();
//# sourceMappingURL=UserAPI.js.map