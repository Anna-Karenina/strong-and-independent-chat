import {isPlainObject} from './isPlainObject.js';
import {identity} from './identity.js';

const classReducer = (rawClass: unknown): string[] => {
  if (typeof rawClass === 'string') return [rawClass.trim()];

  if (isPlainObject(rawClass)) {
    return Object
      .entries(rawClass)
      .filter(([, isExist]) => !!isExist)
      .map(([className]) => className.trim());
  }

  if (Array.isArray(rawClass)) {
    return rawClass.flatMap(classReducer);
  }

  return [];
};

export const classNames = (...rawClasses: unknown[]) => rawClasses
  .flatMap(classReducer)
  .filter(identity)
  .join(' ');