export const onFormSubmit = (formSelector, cb = () => {}) => {
  const form = document.querySelector(formSelector);
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const aggregatedFormData = Object.fromEntries(formData.entries());
    cb(aggregatedFormData);
  });
};
