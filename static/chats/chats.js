
import { modal } from '/js/modal.js';
import { onFormSubmit } from '/js/formSubmit.js';

onFormSubmit('.send-message', console.log);
  
const addUserAction = document.querySelector('.add-user-action');
if (addUserAction) {
  const addUserModal = modal('.add-user-modal');
  addUserAction.addEventListener('click', addUserModal.open);
}
