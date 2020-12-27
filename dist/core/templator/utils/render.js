import { renderVirtualTree } from './virtual.js';
export const render = (query, component) => {
    const root = document.querySelector(query);
    if (!root)
        return root;
    root.lastChild
        ? root.replaceChild(renderComponent(component), root.lastChild)
        : root.appendChild(renderComponent(component));
    return root;
};
export const renderComponent = (component) => {
    const virtualNode = component.render();
    const $el = renderVirtualTree(virtualNode);
    component.element = $el;
    component.virtualNode = virtualNode;
    return $el;
};
//# sourceMappingURL=render.js.map