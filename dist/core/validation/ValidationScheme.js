const REQUIRED_ERROR = 'Обязательно';
const MIN_LENGTH_ERROR = 'Минимальная длина';
const MAX_LENGTH_ERROR = 'Максимальная длина';
;
export default class ValidationScheme {
    constructor(validators = []) {
        this.validators = validators;
    }
    createValidationResult(valid, error) {
        return valid ? { valid, error: null } : { valid, error };
    }
    required(error = REQUIRED_ERROR) {
        const validator = (value) => {
            return this.createValidationResult(!!value, error);
        };
        return new ValidationScheme([...this.validators, validator]);
    }
    minLength(length, error) {
        if (!error) {
            error = `${MIN_LENGTH_ERROR}: ${length}`;
        }
        const validator = (value) => {
            return this.createValidationResult(value.length >= length, error);
        };
        return new ValidationScheme([...this.validators, validator]);
    }
    maxLength(length, error) {
        if (!error) {
            error = `${MAX_LENGTH_ERROR}: ${length}`;
        }
        const validator = (value) => {
            return this.createValidationResult(value.length <= length, error);
        };
        return new ValidationScheme([...this.validators, validator]);
    }
    custom(predicate, error) {
        const validator = (value, ...additionalArgs) => {
            return this.createValidationResult(predicate(value, ...additionalArgs), error);
        };
        return new ValidationScheme([...this.validators, validator]);
    }
    pattern(regExp, error) {
        const validator = (value) => {
            return this.createValidationResult(regExp.test(value), error);
        };
        return new ValidationScheme([...this.validators, validator]);
    }
    validate(value, ...additionalArgs) {
        for (const validator of this.validators) {
            const result = validator(value, ...additionalArgs);
            if (!result.valid)
                return result;
        }
        return { valid: true, error: null };
    }
}
;
//# sourceMappingURL=ValidationScheme.js.map