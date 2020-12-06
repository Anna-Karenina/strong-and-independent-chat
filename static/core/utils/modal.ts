interface IModal {
  open: () => void,
};

export const modal = (selector: string): IModal => {
  const $modal: HTMLElement | null = document.querySelector(selector);
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