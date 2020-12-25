import {http} from '../http/index.js';
import BaseAPI from './BaseAPI.js';

export interface INewUsersData {
  users: number[],
  chatId: number,
}

export default class ChatsAPI extends BaseAPI {
  getChats() {
    return http.get('/chats', {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  addUsers(data: INewUsersData) {
    return http.put<INewUsersData>('/chats/users', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

export const chatsAPI = new ChatsAPI();
