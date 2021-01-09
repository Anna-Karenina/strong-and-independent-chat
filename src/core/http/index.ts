import {METHODS, HOST, WEBSOCKET_CHATS_URL} from './constants';
import HTTPTransport from './HTTPTransport';
import Channel from './Channel';

const http = new HTTPTransport(`${HOST}/api/v2`);

export {
  HTTPTransport,
  Channel,
  http,
  
  METHODS,
  HOST,
  WEBSOCKET_CHATS_URL,
};
