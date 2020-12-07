import Chats from '../../blocks/Chats/index.js';
import { render } from '../../core/templator/index.js';
import { modal } from '../../core/utils/index.js';
let search = '';
let newUserLogin = '';
const onNewUserLoginInput = (e) => {
    const target = e.target;
    newUserLogin = target.value;
    chats.setProps({ newUserLogin });
};
const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const aggregatedFormData = Object.fromEntries(formData.entries());
    console.log(aggregatedFormData);
};
const onSearch = (e) => {
    const target = e.target;
    search = target.value;
    chats.setProps({ search });
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
//# sourceMappingURL=chats.js.map