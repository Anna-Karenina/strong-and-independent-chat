export function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((item, idx) => isEqual(item, b[idx]))
  }

  if (typeof a === 'object' && typeof b === 'object') {
    return Object.keys(a).every((key) => isEqual(a[key], b[key]));
  }

  return a === b;
}
