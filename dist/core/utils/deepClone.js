import { isPlainObject } from './isPlainObject.js';
export const deepClone = (target) => {
    if (Array.isArray(target)) {
        return target.map((item) => deepClone(item));
    }
    if (isPlainObject(target)) {
        return Object.fromEntries(Object
            .entries(target)
            .map(([key, val]) => [key, deepClone(val)]));
    }
    return target;
};
//# sourceMappingURL=deepClone.js.map