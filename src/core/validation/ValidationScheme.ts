const REQUIRED_ERROR  = 'Обязательно';
const MIN_LENGTH_ERROR  = 'Минимальная длина';
const MAX_LENGTH_ERROR  = 'Максимальная длина';

export interface IValidatorResult {
  valid: boolean,
  error: null | string,
};

type TValidator = (value: string, ...additionalArgs: any[]) => IValidatorResult;

export default class ValidationScheme {
  private validators: TValidator[];

  constructor(validators: TValidator[] = []) {
    this.validators = validators;
  }

  private createValidationResult(valid: boolean, error: string): IValidatorResult {
    return valid ? {valid, error: null} : {valid, error};
  }

  required(error: string = REQUIRED_ERROR): ValidationScheme {
    const validator = (value: string): IValidatorResult => {
      return this.createValidationResult(!!value, error);
    };

    return new ValidationScheme([...this.validators, validator]);
  }

  minLength(length: number, error?: string): ValidationScheme {
    if (!error) {
      error = `${MIN_LENGTH_ERROR}: ${length}`;
    }
    const validator = (value: string): IValidatorResult => {
      return this.createValidationResult(value.length >= length, error as string);
    };

    return new ValidationScheme([...this.validators, validator]);
  }

  maxLength(length: number, error?: string): ValidationScheme {
    if (!error) {
      error = `${MAX_LENGTH_ERROR}: ${length}`;
    }
    const validator = (value: string): IValidatorResult => {
      return this.createValidationResult(value.length <= length, error as string);
    };

    return new ValidationScheme([...this.validators, validator]);
  }

  custom(predicate: (value: string, ...additionalArgs: any []) => boolean, error: string): ValidationScheme {
    const validator = (value: string, ...additionalArgs: any[]): IValidatorResult => {
      return this.createValidationResult(predicate(value, ...additionalArgs), error);
    };

    return new ValidationScheme([...this.validators, validator]);
  }

  pattern(regExp: RegExp, error: string): ValidationScheme {
    const validator = (value: string): IValidatorResult => {
      return this.createValidationResult(regExp.test(value), error);
    };

    return new ValidationScheme([...this.validators, validator]);
  }

  validate(value: string, ...additionalArgs: any []): IValidatorResult {
    for (const validator of this.validators) {
      const result = validator(value, ...additionalArgs);
      if (!result.valid) return result;
    }

    return {valid: true, error: null};
  }
};
