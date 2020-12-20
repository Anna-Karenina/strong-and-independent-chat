import VTextNode from '../VNode/VTextNode.js';
import VElementNode from '../VNode/VElementNode.js';
import VComponentNode from '../VNode/VComponentNode.js';
import VNode from '../VNode/VNode.js';
import {TEXT_NODE_TYPE} from './semantic.js';
import {TSemanticNode, TCtx} from '../types/index.js';

const isTextNode = (semanticNode: TSemanticNode) => semanticNode.type === TEXT_NODE_TYPE;

const isComponentNode = (semanticNode: TSemanticNode) => {
  return semanticNode.attrs.hasOwnProperty('__instantiate');
}

export const buildVirtualTree = (semanticNode: TSemanticNode, ctx: TCtx): VNode => {
  switch(true) {
    case isTextNode(semanticNode):
      return new VTextNode(semanticNode, ctx);

    case isComponentNode(semanticNode):
      return new VComponentNode(semanticNode, ctx);

    default: 
      const children = semanticNode.children.map((child) => buildVirtualTree(child, ctx));
      return new VElementNode(semanticNode, ctx, children);
  }
};

export const renderVirtualTree = (virtualNode: VNode): HTMLElement | Text => {
  const $el = virtualNode.render();

  const children = virtualNode.children || [];
  const $children = children.map((child) => renderVirtualTree(child));

  $children.forEach(($child) => {
    $el?.appendChild($child as HTMLElement | Text);
  });

  return $el as HTMLElement | Text;
};
