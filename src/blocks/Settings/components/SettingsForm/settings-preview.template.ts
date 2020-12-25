export const settingsPreviewTemplate = `
<form class="settings__form">
  <settings-field
    type="text"
    label="Почта"
    name="email"
    :readonly="readonly"
    :value="fields.email"
    error=""
  />

  <settings-field
    type="text"
    label="Логин"
    name="login"
    :readonly="readonly"
    :value="fields.login"
    error=""
  />

  <settings-field
    type="text"
    label="Имя"
    name="first_name"
    :readonly="readonly"
    :value="fields.first_name"
    error=""
  />

  <settings-field
    type="text"
    label="Фамилия"
    name="second_name"
    :readonly="readonly"
    :value="fields.second_name"
    error=""
  />

  <settings-field
    type="text"
    label="Имя в чате"
    name="display_name"
    :readonly="readonly"
    :value="fields.display_name"
    error=""
  />

  <settings-field
    type="text"
    label="Телефон"
    name="phone"
    :readonly="readonly"
    :value="fields.phone"
    error=""
  />

  <div class="settings__buttons">
    <button class="settings__button empty-button" type="button" @click="editProfile">Изменить данные</button>
    <button class="settings__button empty-button" type="button" @click="editPassword">Изменить пароль</button>
    <button class="settings__button empty-button color-danger" type="button" @click="onLogout">Выйти</button>
  </div>

</form>
`;