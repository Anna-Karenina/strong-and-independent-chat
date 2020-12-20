export const signinTemplate = `
  <main class="signin">
    <div class="card">
      <h2 class="card__title signin__title">Регистрация</h2>
      <form class="signin-form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">

        <field
          className="signin-form__field"
          type="text"
          label="Почта"
          name="mail"
          :error="formState.mail.error"
          :value="fields.mail"
        />

        <field
          className="signin-form__field"
          type="text"
          label="Логин"
          name="login"
          :error="formState.login.error"
          :value="fields.login"
        />

        <field
          className="signin-form__field"
          type="text"
          label="Имя"
          name="name"
          :error="formState.name.error"
          :value="fields.name"
        />

        <field
          className="signin-form__field"
          type="text"
          label="Фамилия"
          name="surname"
          :error="formState.surname.error"
          :value="fields.surname"
        />

        <field
          className="signin-form__field"
          type="tel"
          label="Телефон"
          name="phone"
          :error="formState.phone.error"
          :value="fields.phone"
        />

        <field
          className="signin-form__field"
          type="password"
          label="Пароль"
          name="password"
          :error="formState.password.error"
          :value="fields.password"
        />

        <field
          className="signin-form__field"
          type="password"
          label="Пароль (ещё раз)"
          name="password_twice"
          :error="formState.password_twice.error"
          :value="fields.password_twice"
        />

        <div class="signin__action-buttons">
          <my-button className="signin__primary-button" type="submit" text="Зарегистрироваться" />
          <button class="empty-button signin__empty-button" type="button">Войти</button>
        </div>

      </form>

    </div>
  </main>
`; 