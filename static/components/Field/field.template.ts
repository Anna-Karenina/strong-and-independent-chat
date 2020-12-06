export const template = `
  <div class="field {{ className }}">
    <div class="field__input-wrapper">
      <input
        type="{{ type }}"
        class="field__input"
        name="{{ name }}"
        autocomplete="on"
        value=""
        @input="inputHandler"
        @blur="onBlur"
      >
      <label class="field__label">{{ label }}</label>
    </div>
    <div class="{{ errorClassName }}">{{ errorText }}</div>
  </div>
`;