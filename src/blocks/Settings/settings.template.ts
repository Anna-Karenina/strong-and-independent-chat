export const settingsTemplate = `
  <div>
    <main class="settings">

      <div class="settings__back" @click="goBack">
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

        <settings-form
          :user="user"
          :editTarget="editTarget"
          :setEditTarget="setEditTarget"
          :onLogout="onLogout"
        />
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