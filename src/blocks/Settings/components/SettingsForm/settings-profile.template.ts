export const settingsProfileTemplate = `
<form class="settings__form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">
  <settings-field
    type="text"
    label="Почта"
    name="email"
    :readonly="readonly"
    :value="fields.email"
    :error="formState.email.error"
  />

  <settings-field
    type="text"
    label="Логин"
    name="login"
    :readonly="readonly"
    :value="fields.login"
    :error="formState.login.error"
  />

  <settings-field
    type="text"
    label="Имя"
    name="first_name"
    :readonly="readonly"
    :value="fields.first_name"
    :error="formState.first_name.error"
  />

  <settings-field
    type="text"
    label="Фамилия"
    name="second_name"
    :readonly="readonly"
    :value="fields.second_name"
    :error="formState.second_name.error"
  />

  <settings-field
    type="text"
    label="Имя в чате"
    name="display_name"
    :readonly="readonly"
    :value="fields.display_name"
    :error="formState.display_name.error"
  />

  <settings-field
    type="text"
    label="Телефон"
    name="phone"
    :readonly="readonly"
    :value="fields.phone"
    :error="formState.phone.error"
  />

  <div class="settings__buttons">
    <my-button className="auth__primary-button" type="submit" text="Сохранить" />
  </div>

</form>
`;