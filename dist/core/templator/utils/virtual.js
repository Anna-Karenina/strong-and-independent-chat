import VTextNode from '../VNode/VTextNode.js';
import VElementNode from '../VNode/VElementNode.js';
import VComponentNode from '../VNode/VComponentNode.js';
import { NodeType } from '../VNode/VNode.js';
import { TEXT_NODE_TYPE } from './semantic.js';
import { pickServiceAttrs } from './attrs.js';
import { each } from './each.js';
import { zip } from '../../utils/index.js';
const isTextNode = (semanticNode) => semanticNode.type === TEXT_NODE_TYPE;
const isChildrenNode = (semanticNode) => {
    const { textContent = '' } = semanticNode.attrs;
    return isTextNode(semanticNode) && String(textContent).trim() === '$children$';
};
const isComponentNode = (semanticNode) => {
    return semanticNode.attrs.hasOwnProperty('__componentClass');
};
export const buildVirtualTree = (semanticNode, ctx) => {
    const serviceAttrs = pickServiceAttrs(semanticNode.attrs);
    if (!serviceAttrs.each) {
        const node = createVirtualNode(semanticNode, ctx);
        return node ? [node] : [];
    }
    return each(String(serviceAttrs.each), ctx)
        .map((newCtx) => createVirtualNode(semanticNode, newCtx))
        .filter((node) => node);
};
export const createVirtualNode = (semanticNode, ctx) => {
    const children = semanticNode.children.flatMap((child) => buildVirtualTree(child, ctx));
    switch (true) {
        case isChildrenNode(semanticNode):
            const [$child] = ctx.$children || [];
            return $child || null;
        case isTextNode(semanticNode):
            return new VTextNode(semanticNode, ctx);
        case isComponentNode(semanticNode):
            return new VComponentNode(semanticNode, ctx, children);
        default:
            return new VElementNode(semanticNode, ctx, children);
    }
};
export const renderVirtualTree = (virtualNode) => {
    const $el = virtualNode.render();
    if (virtualNode.nodeType !== NodeType.ElementNode) {
        return $el;
    }
    const children = virtualNode.children || [];
    const $children = children.map((child) => renderVirtualTree(child));
    $children.forEach(($child) => {
        $el === null || $el === void 0 ? void 0 : $el.appendChild($child);
    });
    return $el;
};
export const cleanerDom = (virtualNode) => {
    const parentClean = virtualNode.destroy();
    const children = virtualNode.children || [];
    const childrenCleaners = children.map((child) => cleanerDom(child));
    return ($node) => {
        parentClean($node);
        const $children = [...$node.childNodes];
        for (const [clean, $child] of zip(childrenCleaners, $children)) {
            if (clean && $child) {
                clean($child);
            }
        }
        return $node;
    };
};
const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });
    const additionalPatch = ($node) => {
        const additionalVChildren = newVChildren.slice(oldVChildren.length);
        if (!additionalVChildren.length)
            return $node;
        const fragment = document.createDocumentFragment();
        for (const additionalVChild of additionalVChildren) {
            fragment.appendChild(renderVirtualTree(additionalVChild));
        }
        $node.appendChild(fragment);
        return $node;
    };
    return ($parent) => {
        const $children = [...$parent.childNodes];
        for (const [patch, $child] of zip(childPatches, $children)) {
            if (patch && $child) {
                patch($child);
            }
        }
        additionalPatch($parent);
        return $parent;
    };
};
export const diff = (oldVNode, newVNode) => {
    if (!newVNode) {
        return ($node) => {
            $node.remove();
        };
    }
    if (oldVNode.nodeType !== newVNode.nodeType || !oldVNode.isSimilar(newVNode)) {
        return ($node) => {
            const $newNode = renderVirtualTree(newVNode);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }
    const patchChildren = diffChildren(oldVNode.children || [], newVNode.children || []);
    return ($node) => {
        const patch = oldVNode.diff(newVNode);
        patch($node);
        patchChildren($node);
        return $node;
    };
};
//# sourceMappingURL=virtual.js.map