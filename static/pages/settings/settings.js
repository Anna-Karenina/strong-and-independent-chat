import { inputBind, inputAgregate } from '../js/inputs.js';
import { modal } from '../js/modal.js';

inputBind('.settings-field__input');

const submit = document.querySelector('.settings__submit');

submit.addEventListener('click', () => {
  const inputsData = inputAgregate('.settings-field__input');
  console.log(inputsData);
});

const changeAvatarAction = document.querySelector('.change-avatar-action');
if (changeAvatarAction) {
  const changeAvatarModal = modal('.change-avatar-modal');
  changeAvatarAction.addEventListener('click', changeAvatarModal.open);
}