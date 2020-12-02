export const authTemplate = `
  <main class="auth">
    <div class="card">

      <h2 class="card__title auth__title">Вход</h2>

      <form class="auth-form" @submit="onSubmit">

        <field className="auth-form__field" type="text" label="Логин" name="login" />

        <field className="auth-form__field" type="password" label="Пароль" name="password" />

        <div class="auth__action-buttons">
          <my-button className="auth__primary-button" type="submit" text="Авторизоваться" />
          <button class="empty-button auth__empty-button" type="button">Нет аккаунта?</button>
        </div>

      </form>

    </div>
  </main>
`; 