import {METHODS, HOST} from './constants';
import HTTPTransport from './http';

const http = new HTTPTransport(`${HOST}/api/v2`);

export {
  HTTPTransport,
  HOST,
  METHODS,
  http,
};
