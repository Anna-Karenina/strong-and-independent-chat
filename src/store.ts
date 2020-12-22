import {Store} from './core/store/index.js';

interface IStoreState {
  user: null | Record<string, any>;
}

export const store = new Store<IStoreState>({
  state: {
    user: null,
  },

  actions: {
    setUser: (ctx, user) => {
      ctx.commit('setUser', user);
    }
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user;
      return state;
    }
  }
});