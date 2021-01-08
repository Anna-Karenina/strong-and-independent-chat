import {PlainObject} from './isPlainObject';

export const get = (obj: PlainObject, path: string, defaultValue?: any) => {
  const keys = path.split('.');

  let result: {[key: string]: any} = obj;
  for (const key of keys) {
    result = result[key] as PlainObject;

    if (result === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return defaultValue;        
    }
  }

  return result ?? defaultValue;
};
