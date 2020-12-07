export const template = `
  <div class="settings-field {{ className }}">

    <div class="settings-field-wrapper">
      <label class="settings-field__label">{{ label }}</label>
      <input
        class="settings-field__input"
        type="{{ type }}"
        value="{{ value }}"
        name="{{ name }}"
        autocomplete="on"
      >
    </div>
    
    <div class="{{ errorClassName }}">{{ errorText }}</div>

  </div>
`;
//# sourceMappingURL=settings-field.template.js.map