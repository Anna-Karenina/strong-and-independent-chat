export function isEmpty(value) {
  if (!value) return true;
  
  return !Object.keys(value).length;
}