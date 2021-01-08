import {isPlainObject} from './isPlainObject';

export const isEqual = (a: unknown, b: unknown): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every((item, idx) => isEqual(item, b[idx]))
    );
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    return (
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((key) => isEqual(a[key], b[key]))
    );
  }

  return a === b;
}
