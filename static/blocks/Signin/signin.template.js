export const signinTemplate = `
  <main class="signin">
    <div class="card">
      <h2 class="card__title signin__title">Регистрация</h2>
      <form class="signin-form" @submit="onSubmit">

        <field className="signin-form__field" type="text" label="Почта" name="mail" />

        <field className="signin-form__field" type="text" label="Логин" name="login" />

        <field className="signin-form__field" type="text" label="Имя" name="name" />

        <field className="signin-form__field" type="text" label="Фамилия" name="surname" />

        <field className="signin-form__field" type="tel" label="Телефон" name="phone" />

        <field className="signin-form__field" type="password" label="Пароль" name="password" />

        <field className="signin-form__field" type="password" label="Пароль (ещё раз)" name="password_twice" />

        <div class="signin__action-buttons">
          <my-button className="signin__primary-button" type="submit" text="Зарегистрироваться" />
          <button class="empty-button signin__empty-button" type="button">Войти</button>
        </div>

      </form>

    </div>
  </main>
`; 