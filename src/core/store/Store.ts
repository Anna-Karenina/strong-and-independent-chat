import EventBus from '../bus/index.js';

type TAction<T> = (ctx: Store<T>, payload: any) => any;
type TMutation<T> = (state: T, payload: any) => any;

type TActions<T> = Record<string, TAction<T>>;
type TMutations<T> = Record<string, TMutation<T>>;

enum StoreStatus {
  RESTING,
  MUTATION,
  ACTION,
};

interface IStore<T extends Record<string, any>> {
  state: T,
  actions?: TActions<T>,
  mutations?: TMutations<T>,
}

interface ISelectResult<T> {
  state: Partial<T>,
  unsubscribe: Function,
};

export default class Store<T extends Record<string, any>> {
  state: T;

  private actions: TActions<T>;

  private mutations: TMutations<T>;

  private status: StoreStatus;

  private storeBus: () => EventBus;

  constructor(params: IStore<T>) {
    const storeBus = new EventBus();
    this.storeBus = () => storeBus;

    this.actions = params.actions || {};
    this.mutations = params.mutations || {};

    this.status = StoreStatus.RESTING;
    
    this.state = this.makeStateProxy(params.state);
  }

  dispatch(actionKey: string, payload: any) {    
    if(typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    
    this.status = StoreStatus.ACTION;
    this.actions[actionKey](this, payload);

    return true;
  }

  commit(mutationKey: string, payload: any) {    
    if(typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }
    
    this.status = StoreStatus.MUTATION;
    this.mutations[mutationKey](this.state, payload);

    return true;
  }

  subscribe(fn: (state: T) => any) {
    this.storeBus().on('update$state', fn);

    return () => {
      this.storeBus().off('update$state', fn);
    };
  }

  select(fields: string[], fn: (field: string, value: any) => any): ISelectResult<T> {
    const partialState = fields.reduce(
      (acc, field) => ({...acc, [field]: this.state[field]}),
      {}
    );

    const subscriptions: {event: string, callback: Function}[] = [];

    fields.forEach((field) => {
      const event = `update:${field}`;
      const callback = (value: any) => fn(field, value);

      this.storeBus().on(event, callback);
      subscriptions.push({event, callback});
    });

    const unsubscribe = () => subscriptions.forEach(({event, callback}) => {
      this.storeBus().off(event, callback);
    });

    return {
      state: partialState,
      unsubscribe,
    };
  }

  private makeStateProxy(state: T) {
    return new Proxy((state), {
      set: (state, key, value) => {
        
        (state as any)[String(key)] = value;
        
        if (this.storeBus().listeners[`update:${String(key)}`]) {
          this.storeBus().emit(`update:${String(key)}`, value);
        }

        if (this.storeBus().listeners['update$state']) {
          this.storeBus().emit(`update$state`, state);
        }
        
        if(this.status !== StoreStatus.MUTATION) {
          console.warn(`You should use a mutation to set ${String(key)}`);
        }
  
        this.status = StoreStatus.RESTING;
        
        return true;
      }
    });
  }
}