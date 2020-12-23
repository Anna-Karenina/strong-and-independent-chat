export const settingsPasswordTemplate = `
<form class="settings__form" @input="onInput">
  <settings-field
    type="password"
    label="Старый пароль"
    name="oldPassword"
    :readonly="readonly"
    :value="fields.oldPassword"
  />

  <settings-field
    type="password"
    label="Новый пароль"
    name="newPassword"
    :readonly="readonly"
    :value="fields.newPassword"
  />

  <settings-field
    type="password"
    label="Повторите новый пароль"
    name="newPasswordTwice"
    :readonly="readonly"
    :value="fields.newPasswordTwice"
  />

  <div class="settings__buttons">
    <my-button className="auth__primary-button" type="button" text="Сохранить" />
  </div>

</form>
`;