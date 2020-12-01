import Auth from '/blocks/Auth/index.js';
import { render } from '/core/templator/index.js'

const auth = new Auth({});
render('#app', auth);