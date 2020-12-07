export default class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`unknown event: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`unknown event: ${event}`);
        }
        this.listeners[event].forEach((cb) => cb(...args));
    }
}
//# sourceMappingURL=EventBus.js.map