import EventBus from '@core/bus';
import {Queue} from '@core/utils';

type TChannelEvent = 'close' | 'message' | 'open' | 'error';

export default class Channel {
  public reconnectInterval = 1000;
  public timeoutInterval = 2000;

  public readyState:number;

  private forcedClose = false;
  private connectingTimedOut = false;

  private protocols:string[] = [];
  public url: string;

  private ws: WebSocket | null;
  private bus: () => EventBus;
  private messagesQueue: Queue<any>;

  constructor(url: string, protocols: string[] = []) {
    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    
    const bus = new EventBus();
    this.bus = () => bus;
    this.messagesQueue = new Queue();

    this.connect()
  }

  private connect(reconnect = false) {
    this.ws = new WebSocket(this.url, this.protocols);

    const timeout = setTimeout((ws: WebSocket) => {
      this.connectingTimedOut = true;
      ws.close();
      this.connectingTimedOut = false;
    }, this.timeoutInterval, this.ws);

    this.ws.onopen = (event:Event) => {
      clearTimeout(timeout);
      this.readyState = WebSocket.OPEN;
      this.nonify('open', event);
      this.processedMessagesQueue();
      
      reconnect = false;
      console.log('[open] Connection is established');
    };

    this.ws.onclose = (event:CloseEvent) => {
      clearTimeout(timeout);
      this.ws = null;

      if (this.forcedClose) {
        this.nonify('close', event);
        this.readyState = WebSocket.CLOSED;
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        return;
      }

      this.readyState = WebSocket.CONNECTING;
      if (!reconnect && !this.connectingTimedOut) {
        console.log('[close] Connection has been terminated');
        this.nonify('close', event);
      }

      setTimeout(() => {
        this.connect(true);
      }, this.reconnectInterval);
    };

    this.ws.onerror = this.onError;
    this.ws.onmessage = this.onMessage;
  }

  private onError = (event: ErrorEvent) => {
    console.error(`[error] ${event.message}`);
    this.nonify('error', event);
  }

  private onMessage = (event: MessageEvent) => {
    this.nonify('message', event.data);
  }

  private nonify(event: TChannelEvent, data?: any) {
    if (this.bus().hasEvent(event)) {
      this.bus().emit(event, data);
    }
  }

  private processedMessagesQueue() {
    while(!this.messagesQueue.isEmpty) {
      if (!this.ws || this.readyState !== WebSocket.OPEN) {
        break;
      }

      const messageNode = this.messagesQueue.dequeue();
      this.ws.send(messageNode.value);
    }
  }

  subscribe(event: TChannelEvent, cb: (data: any) => void) {
    this.bus().on(event, cb);
  }

  send(data: any) {
    if (this.readyState === WebSocket.CONNECTING) {
      this.messagesQueue.enqueue(data);
      return;
    }
    if (this.ws && this.readyState === WebSocket.OPEN) {
      return this.ws.send(data);
    }

    throw new Error('Connection is closed');
  }

  disconnect() {
    if (!this.ws) return false;

    this.forcedClose = true;
    this.ws.close();
    this.bus().offAll();
    return true;
  }

  refresh() {
    if (!this.ws) return false;
    
    this.ws.close();
    return true;
  }
}