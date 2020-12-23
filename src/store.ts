import {Store} from './core/store/index.js';

export interface IStoreState {
  isAuthorized: boolean,
  user: null | Record<string, any>;
}

export const store = new Store<IStoreState>({
  state: {
    user: null,
    isAuthorized: false,
  },

  actions: {
    setUser: (ctx, user) => {
      ctx.commit('setUser', user);
    },

    setAuthorized: (ctx, value) => {
      ctx.commit('setAuthorized', value);
    },
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },

    setAuthorized: (state, value: boolean) => {
      state.isAuthorized = value;
    },
  }
});