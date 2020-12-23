export const settingsPreviewTemplate = `
<form class="settings__form">
  <settings-field
    type="text"
    label="Почта"
    name="email"
    readonly="on"
    :value="fields.email"
  />

  <settings-field
    type="text"
    label="Логин"
    name="login"
    readonly="on"
    :value="fields.login"
  />

  <settings-field
    type="text"
    label="Имя"
    name="first_name"
    readonly="on"
    :value="fields.first_name"
  />

  <settings-field
    type="text"
    label="Фамилия"
    name="second_name"
    readonly="on"
    :value="fields.second_name"
  />

  <settings-field
    type="text"
    label="Имя в чате"
    name="display_name"
    readonly="on"
    :value="fields.display_name"
  />

  <settings-field
    type="text"
    label="Телефон"
    name="phone"
    readonly="on"
    :value="fields.phone"
  />

  <div class="settings__buttons">
    <button class="settings__button empty-button" type="button">Изменить данные</button>
    <button class="settings__button empty-button" type="button">Изменить пароль</button>
    <button class="settings__button empty-button color-danger" type="button" @click="onLogout">Выйти</button>
  </div>

</form>
`;