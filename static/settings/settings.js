import { modal } from '/js/modal.js';
import { onFormSubmit } from '/js/formSubmit.js';

onFormSubmit('.settings__form', console.log);  

const changeAvatarAction = document.querySelector('.change-avatar-action');
if (changeAvatarAction) {
  const changeAvatarModal = modal('.change-avatar-modal');
  changeAvatarAction.addEventListener('click', changeAvatarModal.open);
}
