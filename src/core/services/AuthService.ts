import Service from './Service.js';
import {authAPI} from '../api/auth-api.js'

class AuthService extends Service {
  async connect() {
    try {
      const user = await authAPI.getUser();
      console.log(user);
    } catch (e) {
      console.log(e, 'not authorized');
    }
  }
};

export const authService = new AuthService();
