
import { inputBind, inputAgregate } from '../js/inputs.js';
import { modal } from '../js/modal.js';

inputBind('.search__input', '.send-message__input', '.field__input');

const submit = document.querySelector('.send-message__submit');

submit.addEventListener('click', () => {
  const inputsData = inputAgregate('.send-message__input');
  console.log(inputsData);
});

const addUserAction = document.querySelector('.add-user-action');
if (addUserAction) {
  const addUserModal = modal('.add-user-modal');
  addUserAction.addEventListener('click', addUserModal.open);
}