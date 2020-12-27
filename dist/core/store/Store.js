import EventBus from '../bus/index.js';
var StoreStatus;
(function (StoreStatus) {
    StoreStatus[StoreStatus["RESTING"] = 0] = "RESTING";
    StoreStatus[StoreStatus["MUTATION"] = 1] = "MUTATION";
    StoreStatus[StoreStatus["ACTION"] = 2] = "ACTION";
})(StoreStatus || (StoreStatus = {}));
;
;
export default class Store {
    constructor(params) {
        const storeBus = new EventBus();
        this.storeBus = () => storeBus;
        this.actions = params.actions || {};
        this.mutations = params.mutations || {};
        this.status = StoreStatus.RESTING;
        this.state = this.makeStateProxy(params.state);
    }
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        this.status = StoreStatus.ACTION;
        this.actions[actionKey](this, payload);
        return true;
    }
    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        this.status = StoreStatus.MUTATION;
        this.mutations[mutationKey](this.state, payload);
        return true;
    }
    subscribe(fn) {
        this.storeBus().on('update$state', fn);
        return () => {
            this.storeBus().off('update$state', fn);
        };
    }
    select(fields, fn) {
        const partialState = fields.reduce((acc, field) => ({ ...acc, [field]: this.state[field] }), {});
        const subscriptions = [];
        fields.forEach((field) => {
            const event = `update:${field}`;
            const callback = (value) => fn(field, value);
            this.storeBus().on(event, callback);
            subscriptions.push({ event, callback });
        });
        const unsubscribe = () => subscriptions.forEach(({ event, callback }) => {
            this.storeBus().off(event, callback);
        });
        return {
            state: partialState,
            unsubscribe,
        };
    }
    makeStateProxy(state) {
        return new Proxy((state), {
            set: (state, key, value) => {
                state[String(key)] = value;
                if (this.storeBus().listeners[`update:${String(key)}`]) {
                    this.storeBus().emit(`update:${String(key)}`, value);
                }
                if (this.storeBus().listeners['update$state']) {
                    this.storeBus().emit(`update$state`, state);
                }
                if (this.status !== StoreStatus.MUTATION) {
                    console.warn(`You should use a mutation to set ${String(key)}`);
                }
                this.status = StoreStatus.RESTING;
                return true;
            }
        });
    }
}
//# sourceMappingURL=Store.js.map