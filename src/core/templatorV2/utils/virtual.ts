import VTextNode from '../VNode/VTextNode.js';
import VElementNode from '../VNode/VElementNode.js';
import VComponentNode from '../VNode/VComponentNode.js';
import VNode from '../VNode/VNode.js';
import {TEXT_NODE_TYPE} from './semantic.js';
import {TSemanticNode, TCtx, TPatch} from '../types/index.js';

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

const diffChildren = (oldVChildren: VNode[], newVChildren: VNode[]): TPatch => {
  const childPatches: TPatch[] = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches: TPatch[] = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(renderVirtualTree(additionalVChild));
      return $node;
    });
  }

  return ($parent) => {
    const $children = $parent.childNodes;

    for (let i = 0; i < childPatches.length; i++) {
      const $child = $children[i];
      const patch = childPatches[i];

      patch($child as HTMLElement);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

export const diff = (oldVNode: VNode, newVNode: VNode | undefined): TPatch => {
  if (!newVNode) {
    return ($node) => {
      $node.remove();
    };
  }

  if (oldVNode.nodeType !== newVNode.nodeType) {
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
