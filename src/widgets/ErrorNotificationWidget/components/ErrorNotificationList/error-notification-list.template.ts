export const template = `
  <ul class="error-notification-list">

    <li $each="error in errors" class="error-notification-list__item">
      <i class="fas fa-exclamation-circle error-notification-list__attention-icon"></i>

      <div class="error-notification-list__text">
        {{ error.text }}
      </div>

      <i class="fas fa-times error-notification-list-item__close-icon" @click="error.remove"></i>
    </li>

  </ul>
`;