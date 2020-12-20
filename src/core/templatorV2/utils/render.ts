import Component from '../../componentV2/index.js';
import {renderVirtualTree} from './virtual.js';

export const render = (query: string, component: Component): Element | null => {
  const root = document.querySelector(query);
  root && root.appendChild(renderComponent(component));
  return root;
};

export const renderComponent = (component: Component) => {
  const virtualNode = component.render();
  const $el = renderVirtualTree(virtualNode);

  component.element = $el;
  component.virtualNode = virtualNode;
  return $el;
};