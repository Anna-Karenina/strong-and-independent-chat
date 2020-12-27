import VNode, { NodeType } from './VNode.js';
import { parseAttributes, parseListeners } from '../utils/attrs.js';
export default class VElementNode extends VNode {
    constructor(semanticNode, ctx, children = []) {
        super(NodeType.ElementNode);
        this.tagName = semanticNode.type;
        this.children = children;
        this.attributes = parseAttributes(semanticNode.attrs, ctx);
        this.listeners = parseListeners(semanticNode.attrs, ctx);
    }
    render() {
        const $el = document.createElement(this.tagName);
        Object.entries(this.attributes).forEach(([attr, value]) => {
            if (typeof value !== 'boolean') {
                $el.setAttribute(attr, String(value));
                return;
            }
            value && $el.setAttribute(attr, '');
        });
        Object.entries(this.listeners).forEach(([eventName, listener]) => {
            $el.addEventListener(eventName, listener);
        });
        return $el;
    }
    diff(newVNode) {
        return ($el) => {
            const attrsPatch = this.patchAttributes(newVNode.attributes);
            const listenersPatch = this.patchListeners(newVNode.listeners);
            attrsPatch($el);
            listenersPatch($el);
            return $el;
        };
    }
    isSimilar(newVNode) {
        return this.tagName === newVNode.tagName;
    }
    destroy() {
        return ($el) => {
            Object.keys(this.listeners).forEach((eventName) => {
                $el.removeEventListener(eventName, this.listeners[eventName]);
            });
            return $el;
        };
    }
    patchAttributes(newAttributes) {
        const patches = [];
        Object.keys(this.attributes).forEach((attr) => {
            if (!newAttributes.hasOwnProperty(attr)) {
                patches.push(($el) => {
                    $el.removeAttribute(attr);
                });
            }
        });
        Object.keys(newAttributes).forEach((attr) => {
            if (newAttributes[attr] !== this.attributes[attr]) {
                patches.push(($el) => {
                    const value = newAttributes[attr];
                    if (typeof value !== 'boolean') {
                        $el.setAttribute(attr, String(value));
                        return;
                    }
                    value ? $el.setAttribute(attr, '') : $el.removeAttribute(attr);
                });
            }
        });
        return ($el) => {
            patches.forEach((patch) => patch($el));
        };
    }
    patchListeners(newListeners) {
        const patches = [];
        Object.keys(this.listeners).forEach((eventName) => {
            if (!newListeners.hasOwnProperty(eventName)) {
                patches.push(($el) => {
                    $el.removeEventListener(eventName, this.listeners[eventName]);
                });
            }
        });
        Object.keys(newListeners).forEach((eventName) => {
            if (!this.listeners.hasOwnProperty(eventName)) {
                patches.push(($el) => {
                    $el.addEventListener(eventName, newListeners[eventName]);
                });
            }
            else if (newListeners[eventName] !== this.listeners[eventName]) {
                patches.push(($el) => {
                    $el.removeEventListener(eventName, this.listeners[eventName]);
                    $el.addEventListener(eventName, newListeners[eventName]);
                });
            }
        });
        return ($el) => {
            patches.forEach((patch) => patch($el));
        };
    }
}
;
//# sourceMappingURL=VElementNode.js.map