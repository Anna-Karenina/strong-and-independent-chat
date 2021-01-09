import {METHODS, HOST} from './constants';
import HTTPTransport from './HTTPTransport';
import Channel from './Channel';

const http = new HTTPTransport(`${HOST}/api/v2`);

export {
  HTTPTransport,
  Channel,
  HOST,
  METHODS,
  http,
};
