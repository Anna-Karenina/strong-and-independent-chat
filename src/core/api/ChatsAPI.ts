import {http} from '../http/index';
import BaseAPI from './BaseAPI';

export interface IUsersData {
  users: number[],
  chatId: number,
};

export interface IDeleteChatData {
  chatId: number,
};

export interface ICreateChatData {
  title: string,
};

export default class ChatsAPI extends BaseAPI {
  getChats() {
    return http.get('/chats', {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  createChat(title: string) {
    return http.post<ICreateChatData>('/chats', {
      data: {title},
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  deleteChat(chatId: number) {
    return http.delete<IDeleteChatData>('/chats', {
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
