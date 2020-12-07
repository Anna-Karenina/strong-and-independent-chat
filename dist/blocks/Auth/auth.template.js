export const authTemplate = `
  <main class="auth">
    <div class="card">

      <h2 class="card__title auth__title">Вход</h2>

      <form class="auth-form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">

        <field
          className="auth-form__field"
          type="text"
          label="Логин"
          name="login"
          error="{{ formState.login.error }}"
          value="{{ fields.login }}"
        />

        <field
          className="auth-form__field"
          type="password"
          label="Пароль"
          name="password"
          error="{{ formState.password.error }}"
          value="{{ fields.password }}"
        />

        <div class="auth__action-buttons">
          <my-button className="auth__primary-button" type="submit" text="Авторизоваться" />
          <button class="empty-button auth__empty-button" type="button">Нет аккаунта?</button>
        </div>

      </form>

    </div>
  </main>
`;
//# sourceMappingURL=auth.template.js.map