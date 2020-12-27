import { queryString, isPlainObject } from '../utils/index.js';
import { METHODS } from './constants.js';
;
export default class HTTPTransport {
    constructor(root = '') {
        this.get = (url, options = {}) => {
            return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
        };
        this.request = (url, options, timeout = 5000) => {
            let requestPath = this.createPath(url);
            const { method, headers = {}, data = {}, withCredentials = true } = options;
            const xhr = new XMLHttpRequest();
            if (method === METHODS.GET) {
                const query = queryString(data);
                requestPath += query ? `?${query}` : '';
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
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    }
                    reject(xhr.response);
                };
                if (method === METHODS.GET) {
                    xhr.send();
                }
                else {
                    const processedData = isPlainObject(data) ? JSON.stringify(data) : data;
                    xhr.send(processedData);
                }
            });
        };
        this.root = root;
    }
    createPath(path) {
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        return this.root + path;
    }
}
//# sourceMappingURL=http.js.map