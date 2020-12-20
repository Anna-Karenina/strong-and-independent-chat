import VTextNode from '../VNode/VTextNode.js';
import VElementNode from '../VNode/VElementNode.js';
import VComponentNode from '../VNode/VComponentNode.js';
import VNode from '../VNode/VNode.js';
import {TEXT_NODE_TYPE} from './semantic.js';
import {TSemanticNode, TCtx, TPatch} from '../types/index.js';
import {pickServiceAttrs} from './attrs.js';
import {each} from './each.js';
import {zip} from '../../utils/index.js';

const isTextNode = (semanticNode: TSemanticNode) => semanticNode.type === TEXT_NODE_TYPE;

const isComponentNode = (semanticNode: TSemanticNode) => {
  return semanticNode.attrs.hasOwnProperty('__componentClass');
}

export const buildVirtualTree = (semanticNode: TSemanticNode, ctx: TCtx): VNode[] => {
  const serviceAttrs = pickServiceAttrs(semanticNode.attrs);

  if (!serviceAttrs.each) {
    return [createVirtualNode(semanticNode, ctx)];
  }

  return each(String(serviceAttrs.each), ctx).map((newCtx: TCtx) => createVirtualNode(semanticNode, newCtx))
};

export const createVirtualNode = (semanticNode: TSemanticNode, ctx: TCtx): VNode => {
  switch(true) {
    case isTextNode(semanticNode):
      return new VTextNode(semanticNode, ctx);

    case isComponentNode(semanticNode):
      return new VComponentNode(semanticNode, ctx);

    default: 
      const children = semanticNode.children.flatMap((child) => buildVirtualTree(child, ctx));
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

const diffChildren = (oldVChildren: VNode[], newVChildren: VNode[]): TPatch => {
  const childPatches: TPatch[] = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatch: TPatch = ($node) => {
    const additionalVChildren = newVChildren.slice(oldVChildren.length);
    if (!additionalVChildren.length) return $node;

    const fragment = document.createDocumentFragment();
    for (const additionalVChild of additionalVChildren) {
      fragment.appendChild(renderVirtualTree(additionalVChild));
    }

    $node.appendChild(fragment);
    return $node;
  };

  return ($parent) => {
    const $children = [...$parent.childNodes];
    for (const [patch, $child] of zip<TPatch, ChildNode>(childPatches, $children)) {
      if (patch && $child) {
        patch($child as HTMLElement);
      }
    }

    additionalPatch($parent);
    return $parent;
  };
};

export const diff = (oldVNode: VNode, newVNode: VNode | undefined): TPatch => {
  if (!newVNode) {
    return ($node) => {
      $node.remove();
    };
  }

  if (oldVNode.nodeType !== newVNode.nodeType || !oldVNode.isSimilar(newVNode)) {
    return ($node: HTMLElement | Text) => {
      const $newNode = renderVirtualTree(newVNode);
      $node.replaceWith($newNode);
      return $newNode;
    }
  }

  const patchChildren = diffChildren(oldVNode.children || [], newVNode.children || []);

  return ($node: HTMLElement | Text) => {
    const patch = oldVNode.diff(newVNode);
    patch($node);
    patchChildren($node);
    return $node;
  };
};
