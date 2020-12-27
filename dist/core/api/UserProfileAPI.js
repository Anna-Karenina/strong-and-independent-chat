import { http } from '../http/index.js';
import BaseAPI from './BaseAPI.js';
export default class UserProfileAPI extends BaseAPI {
    updateProfile(data) {
        return http.put('/user/profile', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    updatePassword(data) {
        return http.put('/user/password', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    updateAvatar(data) {
        return http.put('/user/profile/avatar', {
            data,
        });
    }
}
export const userProfileAPI = new UserProfileAPI();
//# sourceMappingURL=UserProfileAPI.js.map