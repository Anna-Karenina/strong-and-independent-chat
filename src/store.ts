import {Store} from './core/store/index.js';

export interface IChat {
  id: number,
  title: string | null,
  avatar: string,
  created_by: number,
};
export interface IStoreState {
  isAuthorized: boolean,
  user: null | Record<string, any>;
  chats: IChat[],
};

export const store = new Store<IStoreState>({
  state: {
    user: null,
    isAuthorized: false,
    chats: []
  },

  actions: {
    setUser: (ctx, user) => {
      ctx.commit('setUser', user);
    },

    setAuthorized: (ctx, value) => {
      ctx.commit('setAuthorized', value);
    },

    setChats: (ctx, chats) => {
      ctx.commit('setChats', chats);
    },
  },

  mutations: {
    setUser: (state, user) => {
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