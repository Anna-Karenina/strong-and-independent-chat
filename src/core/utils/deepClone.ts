import {isPlainObject, PlainObject} from './isPlainObject.js';

export const deepClone = <T>(target: T): T => {
  if (Array.isArray(target)) {
    return (target as any[]).map((item: any) => deepClone<any>(item)) as any;
  }

  if (isPlainObject(target)) {
    return Object.fromEntries(
      Object
        .entries(target as PlainObject<any>)
        .map(([key, val]) => [key, deepClone(val)])
    ) as T;
  }

  return target;
};
