import Templator from './core/templatorV2/index.js';
import MyButton from './components/MyButton/index.js';
import Field from './components/Field/index.js';
import {authTemplate} from './blocks/Auth/auth.template.js';

const templator = new Templator(authTemplate, {
  components: {
    'my-button': MyButton,
    'field': Field,
  },
});

console.log(templator);