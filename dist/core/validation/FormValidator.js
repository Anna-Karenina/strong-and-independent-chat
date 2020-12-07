;
;
export default class FormValidator {
    constructor(validatorsMap) {
        this.validatorsMap = validatorsMap;
        this.initFormState();
    }
    initFormState() {
        this.formState = Object
            .keys(this.validatorsMap)
            .reduce((acc, fieldName) => {
            return { ...acc, [fieldName]: { valid: true, error: null } };
        }, {});
    }
    get valid() {
        return Object.values(this.formState).every((state) => state.valid);
    }
    get invalid() {
        return !this.valid;
    }
    validate(fieldName, value, ...additionalArgs) {
        const scheme = this.validatorsMap[fieldName];
        if (!scheme) {
            throw new Error(`Отсутствует валидатор для поля ${fieldName}`);
        }
        const result = scheme.validate(value, ...additionalArgs);
        this.formState = { ...this.formState, [fieldName]: result };
    }
    validateAll(fieldsMap, additionalArgsMap = {}) {
        Object.entries(fieldsMap).forEach(([field, value]) => {
            const additionalArgs = additionalArgsMap[field] || [];
            this.validate(field, String(value), ...additionalArgs);
        });
    }
}
;
//# sourceMappingURL=FormValidator.js.map