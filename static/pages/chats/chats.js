
const inputs = document.querySelectorAll('input');
const inputSetter = (input) => (event) => {
  input.setAttribute('value',  event.target.value);
};

inputs.forEach((input) => input.addEventListener('input', inputSetter(input)));

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

const addUserAction = document.querySelector('.add-user-action');
if (addUserAction) {
  const addUserModal = modal('.add-user-modal');
  addUserAction.addEventListener('click', addUserModal.open);
}