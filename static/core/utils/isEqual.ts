const isObject = (maybeObject: unknown): boolean => {
  return typeof maybeObject === 'object' && maybeObject !== null;
};

export const isEqual = (a: any, b: any): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every((item, idx) => isEqual(item, b[idx]))
    );
  }

  if (isObject(a) && isObject(b)) {
    return (
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((key) => isEqual(a[key], b[key]))
    );
  }

  return a === b;
}
