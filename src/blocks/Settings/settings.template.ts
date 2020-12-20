export const settingsTemplate = `
  <div>
    <main class="settings">

      <div class="settings__back">
        <button class="settings__back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>

      <div class="settings__content">
        <div class="avatar settings__avatar change-avatar-action">
          <i class="fas fa-image"></i>
          <div class="settings__avatar-change">
            Поменять<br>аватар
          </div>
        </div>

        <h3 class="settings__user-name">Иван</h3>

        <form class="settings__form" @submit="onSubmit" @input="onInput" @focusout="onFocusout">

          <settings-field
            type="text"
            label="Почта"
            name="mail"
            :error="formState.mail.error"
            :value="fields.mail"
          />

          <settings-field
            type="text"
            label="Логин"
            name="login"
            :error="formState.login.error"
            :value="fields.login"
          />

          <settings-field
            type="text"
            label="Имя"
            name="name"
            :error="formState.name.error"
            :value="fields.name"
          />

          <settings-field
            type="text"
            label="Фамилия"
            name="surname"
            :error="formState.surname.error"
            :value="fields.surname"
          />

          <settings-field
            type="text"
            label="Имя в чате"
            name="display_name"
            :error="formState.display_name.error"
            :value="fields.display_name"
          />

          <settings-field
            type="text"
            label="Телефон"
            name="phone"
            :error="formState.phone.error"
            :value="fields.phone"
          />

          <div class="settings__buttons">
            <button class="settings__button empty-button" type="submit">Изменить данные</button>
            <button class="settings__button empty-button" type="button">Изменить пароль</button>
            <button class="settings__button empty-button color-danger" type="button">Выйти</button>
          </div>

        </form>
      </div>

    </main>

    <div class="modal change-avatar-modal">
      <div class="modal__content card">
        <h2 class="card__title modal__title">Файл загружен</h2>

        <div class="change-avatar-modal__input-file">
          <input type="file" id="avatar" class="input-file">
          <label for="avatar" class="input-file__label">Выбрать файл на<br>компьютере</label>
        </div>
        
        <my-button className="change-avatar-modal__submit" type="button" text="Поменять" />
      </div>
    </div>
  </div>
`; 