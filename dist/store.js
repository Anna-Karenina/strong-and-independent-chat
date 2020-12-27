import { Store } from './core/store/index.js';
;
export const store = new Store({
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
        setAuthorized: (state, value) => {
            state.isAuthorized = value;
        },
        setChats: (state, chats) => {
            state.chats = chats;
        },
    }
});
//# sourceMappingURL=store.js.map