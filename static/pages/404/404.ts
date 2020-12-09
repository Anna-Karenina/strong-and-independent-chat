import Page404 from '../../blocks/404/index.js';
import {render} from '../../core/templator/index.js'

const page404 = new Page404({});
render('#app', page404);