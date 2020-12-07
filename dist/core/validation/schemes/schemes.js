import ValidationScheme from '../ValidationScheme.js';
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEXP = /^((\+7|7|8)-?((\(\d{3}\))|\d{3})-?\d{3}-?\d{2}-?\d{2})$/;
export const textFiledScheme = new ValidationScheme()
    .required()
    .minLength(2)
    .maxLength(250);
export const emailScheme = new ValidationScheme()
    .required()
    .pattern(EMAIL_REGEXP, 'Неверный формат');
export const phoneScheme = new ValidationScheme()
    .required()
    .pattern(PHONE_REGEXP, 'Неверный формат');
export const passwordDuplicateScheme = textFiledScheme
    .custom((value, originalPassword) => {
    return value === originalPassword;
}, 'Пароли не совпадают');
//# sourceMappingURL=schemes.js.map