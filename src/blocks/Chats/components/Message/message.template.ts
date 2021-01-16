export const messageTemplate = `
  <li :class="className" :data-message-id="id">
    {{ content }}
    <span class="message-meta">
      <span class="message-meta__send-time">{{ time }}</span>
    </span>
  </li>
`;