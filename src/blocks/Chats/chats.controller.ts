import Chats from './Chats.js';
import {render} from '../../core/templatorV2/index.js'
import {modal} from '../../core/utils/index.js';

let search = '';
let newUserLogin = '';

const onNewUserLoginInput = (e: Event) => {
  const target = e.target as HTMLFormElement;
  newUserLogin = target.value;
  chats.setProps({newUserLogin});
};

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const onSearch = (e: Event) => {
  const target = e.target as HTMLFormElement;
  search = target.value;
  chats.setProps({search});
};

const chats = new Chats({
  newUserLogin,
  search,
  onSubmit,
  onSearch,
  onNewUserLoginInput,
});
render('#app', chats);
  
const addUserAction = document.querySelector('.add-user-action');
if (addUserAction) {
  const addUserModal = modal('.add-user-modal');
  addUserAction.addEventListener('click', addUserModal.open);
}
