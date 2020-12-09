export interface IListeners {
  [key: string]: Function[],
}

export interface IEventBus {
  listeners: IListeners

  on: (event: string, cb: Function) => void,

  off: (event: string, cb: Function) => void,

  emit: (event: string, ...args: any[]) => void,
}

export default class EventBus implements IEventBus {
  listeners: IListeners = {}

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`unknown event: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      cb => cb !== callback
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`unknown event: ${event}`);
    }
    this.listeners[event].forEach((cb) => cb(...args));
  }
}