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

        <form class="settings__form" @submit="onSubmit">

          <div class="settings-field">
            <label class="settings-field__label">Почта</label>
            <input type="text" class="settings-field__input" value="pochta@yandex.ru" name="mail">
          </div>

          <div class="settings-field">
            <label class="settings-field__label">Логин</label>
            <input type="text" class="settings-field__input" value="" name="login">
          </div>

          <div class="settings-field">
            <label class="settings-field__label">Имя</label>
            <input type="text" class="settings-field__input" value="" name="name">
          </div>

          <div class="settings-field">
            <label class="settings-field__label">Фамилия</label>
            <input type="text" class="settings-field__input" value="" name="surname">
          </div>

          <div class="settings-field">
            <label class="settings-field__label">Имя в чате</label>
            <input type="text" class="settings-field__input" value="" name="display_name">
          </div>

          <div class="settings-field">
            <label class="settings-field__label">Телефон</label>
            <input type="text" class="settings-field__input" value="" name="phone">
          </div>

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