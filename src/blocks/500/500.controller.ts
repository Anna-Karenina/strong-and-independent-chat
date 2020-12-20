import Page500 from './Page500.js';
import {render} from '../../core/templatorV2/index.js'

const page500 = new Page500({});
render('#app', page500);