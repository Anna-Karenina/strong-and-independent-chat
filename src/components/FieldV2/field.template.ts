export const template = `
  <div :class="className">
    <div class="field__input-wrapper">
      <input
        class="field__input"
        :type="type"
        :name="name"
        :value="value"
        autocomplete="on"
      >
      <label class="field__label">{{ label }}</label>
    </div>
    <div :class="errorClassName">{{ errorText }}</div>
  </div>
`;