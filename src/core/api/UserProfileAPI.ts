import {http} from '@core/http';
import BaseAPI from './BaseAPI';

export interface IProfileUpdateData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export interface IPasswordUpdateData {
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
