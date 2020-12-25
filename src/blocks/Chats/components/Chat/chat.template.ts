export const chatTemplate = `
  <div :class="chatClass">

    <div class="user-bar">
      <div class="user-bar__info">
        <div class="avatar"></div>
        <div class="user-bar__name">{{ title }}</div>
      </div>

      <button class="user-bar__option-button" @click="openUserOptions" data-click="ignore">
        <i class="fas fa-ellipsis-v user-bar__option-icon"></i>
      </button>

      <ul :class="userOptionsClass" data-click="ignore">
        <li class="options__item add-user-action" @click="tryToAddUser">
          <i class="fas fa-plus-circle options__icon"></i>
          Добавить пользователя
        </li>
        <li class="options__item" @click="tryToDeleteUser">
          <i class="fas fa-minus-circle options__icon"></i>
          Удалить пользователя
        </li>
      </ul>
    </div>

    <div class="messages"></div>

    <form class="send-message" @submit="sendMessage">
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
`; 