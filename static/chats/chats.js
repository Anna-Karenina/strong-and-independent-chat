
import Chats from '/blocks/Chats/index.js';
import { render } from '/core/templator/index.js'
import { modal } from '/js/modal.js';

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const onSearch = (e) => {
  e.target.setAttribute('value', e.target.value);
};

const chats = new Chats({ onSubmit, onSearch });
render('#app', chats);
  
const addUserAction = document.querySelector('.add-user-action');
if (addUserAction) {
  const addUserModal = modal('.add-user-modal');
  addUserAction.addEventListener('click', addUserModal.open);
}
