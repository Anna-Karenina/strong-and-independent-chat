export const chatsTemplate = `
  <div>
    <main class="chats">

      <div class="chat-select">

        <div class="chat-select__navigation">
          <button class="profile-button">
            Профиль
            <i class="fas fa-chevron-right profile-button__icon"></i>
          </button>

          <div class="search chat-select__search">
            <input type="text" class="search__input" placeholder="Поиск" :value="search" @input="onSearch">
            <i class="fas fa-search search__icon"></i>
          </div>
        </div>
        
        <ul class="chat-list">

          <li class="chat-list__item">
            <div class="chat-list__item-content">
              <div class="avatar chat-list__avatar"></div>
              <div class="chat-list__info">
                <div class="chat-list__name">Андрей</div>
                <div class="chat-list__message">
                  <span class="chat-list__sender">Вы: </span>
                  Миллионы ежедневно проводят десятки часов свое
                </div>
              </div>
              <span class="chat-list__sending-time">12:10</span>
              <span class="chat-list__count">3</span>
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

        <div class="messages">
          <div class="messages__datetime">19 июня</div>

          <ul class="messages__list messages__list-sender-interlocutor">
            <li class="message message-sender-interlocutor">
              Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
              <br><br>
              Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
              <span class="message-meta">
                <span class="message-meta__send-time">12:10</span>
              </span>
            </li>

            <li class="message message-sender-interlocutor message-full-space">
              <img src="/static/images/mock-chat-photo.jpg" class="message__photo" alt="photo">
              <span class="message-meta">
                <span class="message-meta__send-time">12:10</span>
              </span>
            </li>
          </ul>

          <ul class="messages__list messages__list-sender-me">
            <li class="message message-sender-me">
              Тест!
              <span class="message-meta">
                <i class="fas fa-check-double"></i>
                <span class="message-meta__send-time">12:10</span>
              </span>
            </li>
          </ul>
        </div>

        <form class="send-message" @submit="onSubmit">
          <div class="send-message__attachments-button">
            <i class="fas fa-paperclip"></i>
          </div>

          <input type="text" class="send-message__input" value="" placeholder="Сообщение" name="message">

          <button class="send-message__submit" type="submit">
            <i class="fas fa-arrow-right"></i>
          </button>

          <ul class="options send-message__options">
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

        <form @input="onNewUserLoginInput">
          <field className="add-user-modal__field" type="text" label="Логин" name="login" :value="newUserLogin" />
          <my-button className="add-user-modal__submit" type="button" text="Добавить" />
        </form>
      </div>
    </div>
  </div>
`; 