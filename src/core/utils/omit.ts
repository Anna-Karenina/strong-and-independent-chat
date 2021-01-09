export const omit = <T extends Record<string, unknown>, K extends (keyof T)[]>(obj: T, fields: K): Partial<T> => {
  const omitedObj:  Partial<T> = {};

  Object.keys(obj).forEach((key: keyof T) => {
    if (fields.includes(key)) return;
    omitedObj[key] = obj[key];
  })

  return omitedObj;
}