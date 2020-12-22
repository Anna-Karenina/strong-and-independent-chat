export const signinTemplate = `
  <main class="signin">
    <div class="card">
      <h2 class="card__title signin__title">Регистрация</h2>
      <form class="signin-form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">

        <field
          className="signin-form__field"
          type="text"
          label="Почта"
          name="email"
          :error="formState.email.error"
          :value="fields.email"
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
          name="first_name"
          :error="formState.first_name.error"
          :value="fields.first_name"
        />

        <field
          className="signin-form__field"
          type="text"
          label="Фамилия"
          name="second_name"
          :error="formState.second_name.error"
          :value="fields.second_name"
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
          <button @click="goToAuth" class="empty-button signin__empty-button" type="button">Войти</button>
        </div>

      </form>

    </div>
  </main>
`; 