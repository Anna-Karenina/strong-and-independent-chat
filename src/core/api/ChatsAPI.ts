import {http} from '../http/index.js';
import BaseAPI from './BaseAPI.js';

export interface IUsersData {
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

  deleteChat(chatId: number) {
    return http.delete<{chatId: number}>('/chats', {
      data: {chatId},
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getChatUsers(chatId: number) {
    return http.get(`chats/${chatId}/users`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  addUsers(data: IUsersData) {
    return http.put<IUsersData>('/chats/users', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  deleteUsers(data: IUsersData) {
    return http.delete<IUsersData>('/chats/users', {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

export const chatsAPI = new ChatsAPI();
