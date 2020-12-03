export const get = <T>(obj: T, path: string, defaultValue: any) => {
  const keys = path.split('.');

  let result: any = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;        
    }
  }

  return result ?? defaultValue;
};
