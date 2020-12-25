import {http} from '../http/index.js';
import BaseAPI from './BaseAPI.js';

export default class ChatsAPI extends BaseAPI {
  getChats() {
    return http.get('/chats', {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

export const chatsAPI = new ChatsAPI();
