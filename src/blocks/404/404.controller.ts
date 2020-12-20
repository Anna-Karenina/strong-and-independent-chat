import Page404 from './Page404.js';
import {render} from '../../core/templatorV2/index.js'

const page404 = new Page404({});
render('#app', page404);