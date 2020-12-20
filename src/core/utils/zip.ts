type TZipped<T, P> = [T | undefined, P | undefined][];

export const zip = <T, P>(l: T[], r: P[]): TZipped<T, P> => {
  const zipped: TZipped<T, P> = [];
  const count = Math.max(l.length, r.length);

  for (let i = 0; i < count; i++) {
    zipped.push([l[i], r[i]]);
  }

  return zipped;
};
