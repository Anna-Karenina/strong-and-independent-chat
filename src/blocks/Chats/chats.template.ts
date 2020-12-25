export const chatsTemplate = `
  <div>
    <main class="chats">

      <div class="chat-select">

        <div class="chat-select__navigation">
          <button class="profile-button" @click="goToProfile">
            Профиль
            <i class="fas fa-chevron-right profile-button__icon"></i>
          </button>
        </div>
        
        <ul class="chat-list">

          <li $each="chat in chats" class="chat-list__item">
            <div class="chat-list__item-content">
              <div class="avatar chat-list__avatar"></div>
              <div class="chat-list__info">
                <div class="chat-list__name">{{ chat.title }}</div>
              </div>
            </div>
          </li>

        </ul>

      </div>

      <div class="chat">

        <div class="user-bar">
          <div class="user-bar__info">
            <div class="avatar"></div>
            <div class="user-bar__name">Андрей</div>
          </div>

          <button class="user-bar__option-button">
            <i class="fas fa-ellipsis-v user-bar__option-icon"></i>
          </button>

          <ul class="options user-bar__options">
            <li class="options__item add-user-action">
              <i class="fas fa-plus-circle options__icon"></i>
              Добавить пользователя
            </li>
            <li class="options__item">
              <i class="fas fa-minus-circle options__icon"></i>
              Удалить пользователя
            </li>
          </ul>
        </div>

        <div class="messages"></div>

        <form class="send-message" @submit="onSubmit">
          <div class="send-message__attachments-button">
            <i class="fas fa-paperclip"></i>
          </div>

          <input type="text" class="send-message__input" value="" placeholder="Сообщение" name="message">

          <button class="send-message__submit" type="submit">
            <i class="fas fa-arrow-right"></i>
          </button>

          <ul class="options send-message__options hidden">
            <li class="options__item">
              <i class="fas fa-image options__icon"></i>
              Фото или Видео
            </li>
            <li class="options__item">
              <i class="fas fa-file options__icon"></i>
              Файл
            </li>
            <li class="options__item">
              <i class="fas fa-map-marker-alt options__icon"></i>
              Локация
            </li>
          </ul>
        </form>

      </div>

    </main>

    <div class="modal add-user-modal">
      <div class="modal__content card">
        <h2 class="card__title modal__title">Добавить пользователя</h2>

        <form>
          <field className="add-user-modal__field" type="text" label="Логин" name="login" />
          <my-button className="add-user-modal__submit" type="button" text="Добавить" />
        </form>
      </div>
    </div>
  </div>
`; 