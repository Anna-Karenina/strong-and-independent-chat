import {queryString} from '../utils/queryString.js';
import {METHODS} from './constants.js';

type TRequestHeaders = Record<string, string>;

type IRequestData = Record<string, any>;

interface IRequestOptions<T extends IRequestData> {
  method: METHODS,
  headers?: TRequestHeaders,
  data?: T,
  timeout?: number,
  withCredentials?: boolean,
};

type PartialRequestOptions<T extends IRequestData> = Partial<IRequestOptions<T>>;

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

  get = <T>(url: string, options: PartialRequestOptions<T> = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  
  post = <T>(url: string, options: PartialRequestOptions<T> = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  
  put = <T>(url: string, options: PartialRequestOptions<T> = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  
  delete = <T>(url: string, options: PartialRequestOptions<T> = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = <T>(url: string, options: IRequestOptions<T>, timeout = 5000) => {
    let requestPath = this.createPath(url);
    const {method, headers = {}, data = {}, withCredentials = true} = options;
    const xhr = new XMLHttpRequest();

    if (method === METHODS.GET) {
      requestPath += queryString(data);
    }

    xhr.open(method, requestPath);

    xhr.timeout = timeout;
    xhr.withCredentials = withCredentials;
    xhr.responseType = 'json';
    
    Object.entries(headers).forEach(([key, val]) => xhr.setRequestHeader(key, val));

    return new Promise((resolve, reject) => {
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject(xhr.response);
        }
        resolve(xhr.response);
      };

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}