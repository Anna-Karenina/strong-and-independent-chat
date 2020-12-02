export const template = `
  <div class="field auth-form__field {{ className }}">
    <div class="field__input-wrapper">
      <input type="{{ type }}" class="field__input" name="{{ name }}" autocomplete="on" value="{{ value }}" @input="inputHandler">
      <label class="field__label">{{ label }}</label>
    </div>
  </div>
`;