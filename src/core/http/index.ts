import {METHODS, HOST} from './constants.js';
import HTTPTransport from './http.js';

const http = new HTTPTransport(`${HOST}/api/v2`);

export {
  HTTPTransport,
  HOST,
  METHODS,
  http,
};
