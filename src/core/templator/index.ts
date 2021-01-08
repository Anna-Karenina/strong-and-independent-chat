import Templator from './Templator';
import {render} from './utils/render';
import {renderVirtualTree, diff, cleanerDom} from './utils/virtual';
import VNode from './VNode/VNode';

export default Templator;

export {
  render,
  renderVirtualTree,
  diff,
  cleanerDom,
  VNode,
}