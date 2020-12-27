export const settingsPasswordTemplate = `
<form class="settings__form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">
  <settings-field
    type="password"
    label="Старый пароль"
    name="oldPassword"
    :value="fields.oldPassword"
    :error="formState.oldPassword.error"
  />

  <settings-field
    type="password"
    label="Новый пароль"
    name="newPassword"
    :value="fields.newPassword"
    :error="formState.newPassword.error"
  />

  <settings-field
    type="password"
    label="Повторите новый пароль"
    name="newPasswordTwice"
    :value="fields.newPasswordTwice"
    :error="formState.newPasswordTwice.error"
  />

  <div class="settings__buttons">
    <my-button className="settings__save-button" type="submit" text="Сохранить" />
  </div>

</form>
`;
//# sourceMappingURL=settings-password.template.js.map