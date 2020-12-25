import {http} from '../http/index.js';
import BaseAPI from './BaseAPI.js';

export interface ISearchData {
  login: string,
}

export default class UserAPI extends BaseAPI {
  search(data: ISearchData) {
    return http.post<ISearchData>('/user/search', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

export const userAPI = new UserAPI();
