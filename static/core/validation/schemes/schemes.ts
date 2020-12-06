import ValidationScheme from '../ValidationScheme.js';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const textFiledScheme = new ValidationScheme()
  .required()
  .minLength(2)
  .maxLength(250);

export const emailScheme = new ValidationScheme()
  .required()
  .pattern(EMAIL_REGEXP, 'Неверный формат');
  
export const passwordDuplicateScheme = new ValidationScheme()
  .required()
  .custom((value: string, originalPassword: string) => {
    return value === originalPassword;
  }, 'Пароли не совпадают');