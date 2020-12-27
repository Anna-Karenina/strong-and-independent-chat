import { isPlainObject } from './isPlainObject.js';
export const isEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        return (a.length === b.length &&
            a.every((item, idx) => isEqual(item, b[idx])));
    }
    if (isPlainObject(a) && isPlainObject(b)) {
        return (Object.keys(a).length === Object.keys(b).length &&
            Object.keys(a).every((key) => isEqual(a[key], b[key])));
    }
    return a === b;
};
//# sourceMappingURL=isEqual.js.map