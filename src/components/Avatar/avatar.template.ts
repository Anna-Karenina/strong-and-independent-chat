export const avatarTemplate = `
  <div :class="className">
    <img $if="avatar" class="avatar__image" :src="avatar" alt="avatar">
  </div>
`;