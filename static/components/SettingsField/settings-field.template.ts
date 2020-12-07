export const template = `
  <div class="settings-field {{ className }}">
    <label class="settings-field__label">{{ label }}</label>
    <input type="{{ type }}" class="settings-field__input" value="{{ value }}" name="{{ name }}" autocomplete="on">
    <div class="{{ errorClassName }}">{{ errorText }}</div>
  </div>
`;