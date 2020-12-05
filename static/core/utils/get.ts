export const get = (obj: object, path: string, defaultValue?: any) => {
  const keys = path.split('.');

  let result: { [key: string]: any } = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;        
    }
  }

  return result ?? defaultValue;
};
