const isObject = (maybeObject: unknown): boolean => {
  return typeof maybeObject === 'object' && maybeObject !== null;
};

export const isEqual = (a: any, b: any): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((item, idx) => isEqual(item, b[idx]))
  }

  if (isObject(a) && isObject(b)) {
    return Object.keys(a).every((key) => isEqual(a[key], b[key]));
  }

  return a === b;
}
