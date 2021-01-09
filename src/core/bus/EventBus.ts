type IHandler = (...args: unknown[]) => void;
export interface IListeners {
  [key: string]: IHandler[],
}

export interface IEventBus {
  listeners: IListeners

  on: (event: string, cb: IHandler) => void,

  off: (event: string, cb: IHandler) => void,

  emit: (event: string, ...args: unknown[]) => void,
}

export default class EventBus implements IEventBus {
  listeners: IListeners = {}

  on(event: string, callback: IHandler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: IHandler) {
    if (!this.listeners[event]) {
      throw new Error(`unknown event: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      cb => cb !== callback
    );
  }

  offAll() {
    this.listeners = {};
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`unknown event: ${event}`);
    }
    this.listeners[event].forEach((cb) => cb(...args));
  }

  hasEvent(event: string) {
    return !!this.listeners[event];
  }
}