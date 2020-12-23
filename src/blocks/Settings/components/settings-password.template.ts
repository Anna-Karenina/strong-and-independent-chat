export const settingsPasswordTemplate = `
<form class="settings__form">
  <settings-field
    type="password"
    label="Старый пароль"
    name="email"
    :readonly="readonly"
    :value="fields.oldPassword"
  />

  <settings-field
    type="password"
    label="Новый пароль"
    name="login"
    :readonly="readonly"
    :value="fields.newPassword"
  />

  <settings-field
    type="password"
    label="Повторите новый пароль"
    name="first_name"
    :readonly="readonly"
    :value="fields.newPasswordTwice"
  />

  <div class="settings__buttons">
    <my-button className="auth__primary-button" type="button" text="Сохранить" />
  </div>

</form>
`;