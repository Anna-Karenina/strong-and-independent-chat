export const deepClone = <T>(target: T): T => {
  if (Array.isArray(target)) {
    return (target as any[]).map((item: any) => deepClone<any>(item)) as any;
  }

  if (typeof target === 'object' && target !== null) {
    return Object.fromEntries(
      Object
        .entries(target)
        .map(([key, val]) => [key, deepClone(val)])
    ) as T;
  }

  return target;
};
