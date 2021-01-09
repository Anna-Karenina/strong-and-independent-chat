import EventBus from '@core/bus';

export default class Channel {
  private ws: WebSocket;
  private bus: () => EventBus;

  constructor(url: string) {
    this.ws = new WebSocket(url);

    const bus = new EventBus();
    this.bus = () => bus;

    this.initListeners();
  }

  private initListeners() {
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('error', this.onError);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('message', this.onMessage);
  }

  // private removeListeners() {
  //   this.ws.removeEventListener('open', this.onOpen);
  //   this.ws.removeEventListener('error', this.onError);
  //   this.ws.removeEventListener('close', this.onClose);
  //   this.ws.removeEventListener('message', this.onMessage);
  // }

  private onOpen = () => {
    console.log('[open] Connection is established');
  }

  private onError = (event: ErrorEvent) => {
    console.error(`[error] ${event.message}`);
  }

  private onClose = (event: CloseEvent) => {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log('[close] Connection has been terminated');
    }
  }

  private onMessage = (event: MessageEvent) => {
    if (this.bus().hasEvent('message')) {
      this.bus().emit('message', event.data);
    }
  }

  subscribe(cb: (data: any) => void) {
    this.bus().on('message', cb);
  }

  send(data: any) {
    return this.ws.send(data);
  }

  disconnect() {
    this.ws.close();
    this.bus().offAll();
    // this.removeListeners();
  }
}