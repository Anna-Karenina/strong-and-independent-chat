import {PlainObject} from './isPlainObject';

type TValue = null | PlainObject | string | (number | string | PlainObject[])

export const isEmpty = (value: TValue) => {
  if (!value) return true;
  
  return !Object.keys(value).length;
}