import {http} from '../http/index.js';
import BaseAPI from './BaseAPI.js';

interface IProfileUpdateData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

interface IPasswordUpdateData {
  oldPassword: string,
  newPassword: string,
}

export default class UserProfileAPI extends BaseAPI {
  updateProfile(data: IProfileUpdateData) {
    return http.put<IProfileUpdateData>('/user/profile', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  updatePassword(data: IPasswordUpdateData) {
    return http.put<IPasswordUpdateData>('/user/password', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  updateAvatar(data: FormData) {
    return http.put<FormData>('/user/profile/avatar', {
      data,
    });
  }
}

export const userProfileAPI = new UserProfileAPI();
