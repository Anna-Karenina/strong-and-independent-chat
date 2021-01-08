import {PlainObject} from './isPlainObject';

export const get = (obj: PlainObject, path: string, defaultValue?: unknown) => {
  const keys = path.split('.');

  let result: {[key: string]: unknown} = obj;
  for (const key of keys) {
    result = result[key] as PlainObject;

    if (result === undefined) {
      return defaultValue;        
    }
  }

  return result ?? defaultValue;
};
