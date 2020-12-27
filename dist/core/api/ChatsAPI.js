import { http } from '../http/index.js';
import BaseAPI from './BaseAPI.js';
;
;
;
export default class ChatsAPI extends BaseAPI {
    getChats() {
        return http.get('/chats', {
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    createChat(title) {
        return http.post('/chats', {
            data: { title },
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    deleteChat(chatId) {
        return http.delete('/chats', {
            data: { chatId },
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    getChatUsers(chatId) {
        return http.get(`chats/${chatId}/users`, {
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    addUsers(data) {
        return http.put('/chats/users', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    deleteUsers(data) {
        return http.delete('/chats/users', {
            data,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
export const chatsAPI = new ChatsAPI();
//# sourceMappingURL=ChatsAPI.js.map