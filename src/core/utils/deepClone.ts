import {isPlainObject, PlainObject} from './isPlainObject';

export const deepClone = <T>(target: T): T => {
  if (Array.isArray(target)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (target as unknown[]).map((item: unknown) => deepClone<unknown>(item)) as any;
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
