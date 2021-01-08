import Component from '@core/component';
import {renderVirtualTree} from './virtual';

export const render = (query: string, component: Component): Element | null => {
  const root = document.querySelector(query);
  if (!root) return root;

  root.lastChild
    ? root.replaceChild(renderComponent(component), root.lastChild)
    : root.appendChild(renderComponent(component));
  return root;
};

export const renderComponent = (component: Component) => {
  const virtualNode = component.render();
  const $el = renderVirtualTree(virtualNode);

  component.element = $el;
  component.virtualNode = virtualNode;
  return $el;
};