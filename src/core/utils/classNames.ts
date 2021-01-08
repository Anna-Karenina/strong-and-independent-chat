import {isPlainObject} from './isPlainObject';
import {identity} from './identity';

const classReducer = (rawClass: unknown): string => {
  if (!rawClass) return '';

  if (typeof rawClass === 'string') return rawClass.trim();

  if (isPlainObject(rawClass)) {
    return Object
      .entries(rawClass)
      .filter(([, isExist]) => !!isExist)
      .map(([className]) => className.trim())
      .join(' ');
  }

  if (Array.isArray(rawClass)) {
    return classNames(...rawClass);
  }

  return '';
};

export const classNames = (...rawClasses: unknown[]) => rawClasses
  .map(classReducer)
  .filter(identity)
  .join(' ');