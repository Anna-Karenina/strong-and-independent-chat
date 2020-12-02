import Signin from '/blocks/Signin/index.js';
import { render } from '/core/templator/index.js'

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const aggregatedFormData = Object.fromEntries(formData.entries());
  console.log(aggregatedFormData);
};

const signin = new Signin({ onSubmit });
render('#app', signin);