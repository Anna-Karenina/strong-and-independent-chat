export const avatarModalTemplate = `
  <modal :show="show" :onClose="onClose">
    <div class="modal__content card">
      <h2 class="card__title modal__title">Файл загружен</h2>

      <form @submit="onSubmit">
        <div class="change-avatar-modal__input-file">
          <input type="file" name="avatar" id="avatar" accept="image/*" class="input-file">
          <label for="avatar" class="input-file__label">Выбрать файл на<br>компьютере</label>
        </div>
        
        <my-button className="change-avatar-modal__submit" type="submit" text="Поменять" />
      </form>
    </div>
  </modal>
`;