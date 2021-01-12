export const messageTemplate = `
  <li :class="className">
    {{ content }}
    <span class="message-meta">
      <span class="message-meta__send-time">{{ time }}</span>
    </span>
  </li>
`;