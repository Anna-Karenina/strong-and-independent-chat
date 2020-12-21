import Templator from './Templator.js';
import {render} from './utils/render.js';
import {renderVirtualTree, diff, cleanerDom} from './utils/virtual.js';

export default Templator;

export {
  render,
  renderVirtualTree,
  diff,
  cleanerDom,
}