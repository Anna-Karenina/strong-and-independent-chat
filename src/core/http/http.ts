import {queryString} from '../utils/queryString.js';
import {METHODS} from './constants.js';

type TRequestHeaders = Record<string, string>;

type IRequestData = Record<string, unknown>;

interface IRequestOptions {
  method: METHODS,
  headers?: TRequestHeaders,
  data?: IRequestData,
  timeout?: number,
  withCredentials?: boolean,
};

type PartialRequestOptions = Partial<IRequestOptions>;

export default class HTTPTransport {
  root: string;

  constructor(root = '') {
    this.root = root;
  }

  createPath(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    return this.root + path;
  }

  get = (url: string, options: PartialRequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  
  post = (url: string, options: PartialRequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  
  put = (url: string, options: PartialRequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  
  delete = (url: string, options: PartialRequestOptions = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: IRequestOptions, timeout = 5000) => {
    let requestPath = this.createPath(url);
    const {method, headers = {}, data = {}, withCredentials = true} = options;
    const xhr = new XMLHttpRequest();

    if (method === METHODS.GET) {
      requestPath += queryString(data);
    }

    xhr.open(method, requestPath)
    xhr.timeout = timeout;
    xhr.withCredentials = withCredentials;
    Object.entries(headers).forEach(([key, val]) => xhr.setRequestHeader(key, val));

    return new Promise((resolve, reject) => {
      xhr.onload = function() {
        resolve(xhr);
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}