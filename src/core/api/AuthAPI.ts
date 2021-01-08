import {http} from '@core/http';
import BaseAPI from './BaseAPI';

interface ISignupData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

interface ISigninData {
  login: string,
  password: string,
}

export default class AuthAPI extends BaseAPI {
  signup(data: ISignupData) {
    return http.post<ISignupData>('/auth/signup', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  signin(data: ISigninData) {
    return http.post<ISigninData>('/auth/signin', {
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
