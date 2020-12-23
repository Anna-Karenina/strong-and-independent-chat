export const settingsProfileTemplate = `
<form class="settings__form" @input="onInput">
  <settings-field
    type="text"
    label="Почта"
    name="email"
    :readonly="readonly"
    :value="fields.email"
  />

  <settings-field
    type="text"
    label="Логин"
    name="login"
    :readonly="readonly"
    :value="fields.login"
  />

  <settings-field
    type="text"
    label="Имя"
    name="first_name"
    :readonly="readonly"
    :value="fields.first_name"
  />

  <settings-field
    type="text"
    label="Фамилия"
    name="second_name"
    :readonly="readonly"
    :value="fields.second_name"
  />

  <settings-field
    type="text"
    label="Имя в чате"
    name="display_name"
    :readonly="readonly"
    :value="fields.display_name"
  />

  <settings-field
    type="text"
    label="Телефон"
    name="phone"
    :readonly="readonly"
    :value="fields.phone"
  />

  <div class="settings__buttons">
    <my-button className="auth__primary-button" type="button" text="Сохранить" />
  </div>

</form>
`;