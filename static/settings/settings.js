import Settings from '/blocks/Settings/index.js';
import { render } from '/core/templator/index.js'
import { modal } from '/core/utils/index.js';

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const settings = new Settings({ onSubmit });
render('#app', settings);

const changeAvatarAction = document.querySelector('.change-avatar-action');
if (changeAvatarAction) {
  const changeAvatarModal = modal('.change-avatar-modal');
  changeAvatarAction.addEventListener('click', changeAvatarModal.open);
}
