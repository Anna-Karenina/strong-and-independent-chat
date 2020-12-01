export const authTemplate = `
  <main class="auth">
    <div class="card">

      <h2 class="card__title auth__title">Вход</h2>

      <form class="auth-form">

        <div class="field auth-form__field">
          <div class="field__input-wrapper">
            <input type="text" class="field__input" name="login" value="">
            <label class="field__label">Логин</label>
          </div>
          <div class="error field__error">Неверный логин</div>
        </div>

        <div class="field auth-form__field">
          <div class="field__input-wrapper">
            <input type="password" class="field__input" name="password" autocomplete value="">
            <label class="field__label">Пароль</label>
          </div>
        </div>

        <div class="auth__action-buttons">
          <my-button className="auth__primary-button" type="submit" text="Авторизоваться" />
          <button class="empty-button auth__empty-button" type="button">Нет аккаунта?</button>
        </div>

      </form>

    </div>
  </main>
`; 