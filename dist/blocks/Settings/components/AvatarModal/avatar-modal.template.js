export const avatarModalTemplate = `
  <modal :show="show" :onClose="onClose">
    <div class="modal__content card">
      <h2 class="card__title modal__title">Файл загружен</h2>

      <form @submit="onSubmit">
        <div class="change-avatar-modal__input-file">
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            class="input-file"
            :value="file"
            @input="onInput"
          >
          <label for="avatar" :class="labelClass">Выбрать файл на<br>компьютере</label>
          <div class="input-file__name">{{ fileName }}</div>
        </div>
        
        <my-button className="change-avatar-modal__submit" type="submit" text="Поменять" />
      </form>
    </div>
  </modal>
`;
//# sourceMappingURL=avatar-modal.template.js.map