import { isPlainObject } from './isPlainObject.js';
export const queryString = (data) => {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new Error('input must be an object');
    }
    const iter = (data, parent = '') => {
        if (Array.isArray(data)) {
            return data
                .map((item, idx) => iter(item, `${parent}[${idx}]`))
                .join('&');
        }
        if (isPlainObject(data)) {
            return Object
                .keys(data)
                .map((key) => iter(data[key], `${parent}[${key}]`))
                .join('&');
        }
        if (data === null || data === undefined) {
            return `${parent}=`;
        }
        return `${parent}=${data}`;
    };
    return Object
        .keys(data)
        .map((key) => iter(data[key], key))
        .join('&');
};
//# sourceMappingURL=queryString.js.map