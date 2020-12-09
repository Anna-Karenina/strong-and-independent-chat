type TValue = null | object | string | (number | string | object[])

export const isEmpty = (value: TValue) => {
  if (!value) return true;
  
  return !Object.keys(value).length;
}