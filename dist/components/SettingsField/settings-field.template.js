export const template = `
  <div :class="className">

    <div class="settings-field-wrapper">
      <label class="settings-field__label">{{ label }}</label>
      <input
        class="settings-field__input"
        :type="type"
        :value="value"
        :name="name"
        :readonly="readonly"
        autocomplete="on"
      >
    </div>
    
    <div :class="errorClassName">{{ errorText }}</div>

  </div>
`;
//# sourceMappingURL=settings-field.template.js.map