export const first = (list: unknown) => {
  return Array.isArray(list) 
    ? list[0] as unknown
    : undefined;
}