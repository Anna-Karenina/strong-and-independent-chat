import {Store} from '@core/store';
import {IUser, IChat, IMessage} from '@/types';
export interface IStoreState {
  isAuthorized: boolean,
  user: IUser | null;
  chats: IChat[],
  chatMessages: Record<string, IMessage[]>
}

interface IChatMessagesPayload {
  chatId: number,
  messages: IMessage[],
}

export const store = new Store<IStoreState>({
  state: {
    user: null,
    isAuthorized: false,
    chats: [],
    chatMessages: {},
  },

  actions: {
    setUser: (ctx, user: IUser) => {
      ctx.commit('setUser', user);
    },

    setAuthorized: (ctx, value: boolean) => {
      ctx.commit('setAuthorized', value);
    },

    setChats: (ctx, chats: IChat[]) => {
      ctx.commit('setChats', chats);
    },

    setChatMessages: (ctx, payload: IChatMessagesPayload) => {
      ctx.commit('setChatMessages', payload);
    }
  },

  mutations: {
    setUser: (state, user: IUser) => {
      state.user = user;
    },

    setAuthorized: (state, value: boolean) => {
      state.isAuthorized = value;
    },

    setChats: (state, chats: IChat[]) => {
      state.chats = chats;
    },

    setChatMessages: (state, payload: IChatMessagesPayload) => {
      const {chatId, messages} = payload;
      const newChatMessages = {...state.chatMessages, [chatId]: messages};

      state.chatMessages = newChatMessages;
    },
  }
});