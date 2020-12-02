import Auth from '/blocks/Auth/index.js';
import { render } from '/core/templator/index.js'

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const auth = new Auth({ onSubmit });
render('#app', auth);