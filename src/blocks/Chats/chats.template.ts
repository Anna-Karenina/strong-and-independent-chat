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

          <li $each="chat in chats" class="chat-list__item" @click="chat.onClick">
            <div class="chat-list__item-content">
              <div class="avatar chat-list__avatar"></div>
              <div class="chat-list__info">
                <div class="chat-list__name">{{ chat.title }}</div>
              </div>
            </div>
          </li>

        </ul>

      </div>

      <chat :chat="selectedChat" :sendMessage="sendMessage" :openAddUserModal="openAddUserModal" />

    </main>

    <modal :show="showAddUserModal" :onClose="closeAddUserModal">
      <div class="modal__content card">
        <h2 class="card__title modal__title">Добавить пользователя</h2>

        <form>
          <div class="search chat-select__search">
            <input type="text" class="search__input" placeholder="Поиск" :value="search" @input="onSearch">
            <i class="fas fa-search search__icon"></i>
          </div>

          <div class="user-modal__user-list">
            <div class="user-modal__user-list-item" $each="user in users">
              <div class="user-modal__user-info">
                <div class="avatar"></div>
                <div class="user-modal__user-name">{{ user.login }}</div>
              </div>

              <i class="fas fa-plus-circle options__icon user-modal__add-icon" @click="user.add"></i>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
`; 