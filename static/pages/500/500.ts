import Page500 from '../../blocks/500/index.js';
import { render } from '../../core/templator/index.js'

const page500 = new Page500({});
render('#app', page500);