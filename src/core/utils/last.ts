export const last = (list: unknown) => {
  return Array.isArray(list) 
    ? list[list.length - 1] as unknown
    : undefined;
}