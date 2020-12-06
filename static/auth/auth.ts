import Auth from '../blocks/Auth/index.js';
import { render } from '../core/templator/index.js'

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const auth = new Auth({ onSubmit });
render('#app', auth);