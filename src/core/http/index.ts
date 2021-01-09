import {METHODS, HOST} from './constants';
import HTTPTransport from './HTTPTransport';

const http = new HTTPTransport(`${HOST}/api/v2`);

export {
  HTTPTransport,
  HOST,
  METHODS,
  http,
};
