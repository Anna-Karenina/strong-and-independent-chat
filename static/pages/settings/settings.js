const modal = (selector) => {
  const $modal = document.querySelector(selector);
  if (!$modal) return { open: () => {} };

  $modal.addEventListener('click', (e) => {
    if (e.target === $modal) {
      $modal.classList.remove('modal-show');
    }
  });

  return {
    open: () => $modal.classList.add('modal-show'),
  };
};

const changeAvatarAction = document.querySelector('.change-avatar-action');
if (changeAvatarAction) {
  const changeAvatarModal = modal('.change-avatar-modal');
  changeAvatarAction.addEventListener('click', changeAvatarModal.open);
}