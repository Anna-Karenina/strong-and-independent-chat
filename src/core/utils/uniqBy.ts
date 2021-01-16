// eslint-disable-next-line @typescript-eslint/ban-types
export const uniqBy = <T extends object>(arr: T[], field: keyof T) => {
  const map = new Map();
  const result = [];

  for(const item of arr) {
    const uniqVal = item[field];
    if (map.has(uniqVal)) continue;

    result.push(item);
    map.set(uniqVal, true);
  }

  return result;
};
