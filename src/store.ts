import {Store} from './core/store/index.js';
import {IUser, IChat} from './types/index.js';
export interface IStoreState {
  isAuthorized: boolean,
  user: IUser | null;
  chats: IChat[],
};

export const store = new Store<IStoreState>({
  state: {
    user: null,
    isAuthorized: false,
    chats: []
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
  }
});