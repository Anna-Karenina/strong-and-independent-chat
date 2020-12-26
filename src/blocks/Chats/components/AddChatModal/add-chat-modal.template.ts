export const addChatModalTemplate = `
  <modal :show="show" :onClose="onClose">
    <div class="modal__content card">
      <h2 class="card__title modal__title">Добавление чата</h2>

      <form @submit="onSubmit" @input="onInput" @focusout="onFocusout">
        <field
          className="add-chat-modal__field"
          type="text"
          label="Название чата"
          name="title"
          :error="formState.title.error"
          :value="title"
        />

        <my-button className="add-chat-modal__submit" type="submit" text="Добавить" />
      </form>
    </div>
  </modal>
`;