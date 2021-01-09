import {http} from '@core/http';
import BaseAPI from './BaseAPI';

export default class ChatMessagesAPI extends BaseAPI {
  createChatToken(chatId: number) {
    return http.post(`/chats/token/${chatId}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getNewMessagesCount(chatId: number) {
    return http.get(`/chats/new/${chatId}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

export const chatMessagesAPI = new ChatMessagesAPI();
