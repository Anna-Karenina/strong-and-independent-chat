export const settingsTemplate = `
  <div>
    <main class="settings">

      <div class="settings__back" @click="goBack">
        <button class="settings__back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>

      <div class="settings__content">
        <div class="avatar settings__avatar" :style="avatarStyle" @click="openAvatarModal">
          <i :class="avatarIconClass"></i>
          <div class="settings__avatar-change">
            Поменять<br>аватар
          </div>
        </div>

        <h3 class="settings__user-name">{{ name }}</h3>

        <settings-form
          :user="user"
          :editTarget="editTarget"
          :setEditTarget="setEditTarget"
          :onLogout="onLogout"
          :updateProfile="updateProfile"
          :updatePassword="updatePassword"
        />
      </div>

    </main>

    <avatar-modal :show="showAvatarModal" :onClose="closeAvatarModal" :updateAvatar="updateAvatar" />
  </div>
`;
//# sourceMappingURL=settings.template.js.map