import ValidationScheme, { IValidatorResult } from './ValidationScheme.js';

interface IValidatorsMap {
  [fieldName: string]: ValidationScheme,
};

export interface IFormState {
  [fieldName: string]: IValidatorResult,
};

export default class FormValidator {
  private validatorsMap: IValidatorsMap;

  formState: IFormState;

  constructor(validatorsMap: IValidatorsMap) {
    this.validatorsMap = validatorsMap;
    this.initFormState();
  }

  private initFormState() {
    this.formState = Object
      .keys(this.validatorsMap)
      .reduce((acc: IFormState, fieldName: string) => {
        return { ...acc, [fieldName]: { valid: true, error: null } };
      }, {});
  }

  get valid() {
    return Object.values(this.formState).every((state) => state.valid);
  }

  get invalid() {
    return !this.valid;
  }

  validate(fieldName: string, value: string, ...additionalArgs: any[]) {
    const scheme = this.validatorsMap[fieldName];
    if (!scheme) {
      throw new Error(`Отсутствует валидатор для поля ${fieldName}`);
    }

    const result = scheme.validate(value, ...additionalArgs);
    this.formState = { ...this.formState, [fieldName]: result };
  }

  validateAll(fieldsMap: { [key: string]: any }, additionalArgsMap: { [key: string]: any[] } = {}) {
    Object.entries(fieldsMap).forEach(([field, value]) => {
      const additionalArgs = additionalArgsMap[field] || [];
      this.validate(field, String(value), ...additionalArgs);
    });
  }
};
