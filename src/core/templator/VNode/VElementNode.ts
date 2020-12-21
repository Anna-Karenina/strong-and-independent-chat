import VNode, {NodeType} from './VNode.js';
import {TSemanticNode, TAttrs, TListeners, TCtx, TPatch} from '../types/index.js';
import {parseAttributes, parseListeners} from '../utils/attrs.js';

export default class VElementNode extends VNode {
  tagName: string;
  children: VNode[]
  attributes: TAttrs;
  listeners: TListeners;

  constructor(semanticNode: TSemanticNode, ctx: TCtx, children: VNode[] = []) {
    super(NodeType.ElementNode);
    this.tagName = semanticNode.type;
    this.children = children;

    this.attributes = parseAttributes(semanticNode.attrs, ctx);
    this.listeners = parseListeners(semanticNode.attrs, ctx);
  }

  render() {
    const $el = document.createElement(this.tagName);

    Object.entries(this.attributes).forEach(([attr, value]) => {
      $el.setAttribute(attr, String(value));
    });

    Object.entries(this.listeners).forEach(([eventName, listener]) => {
      $el.addEventListener(eventName, listener as EventListener);
    });

    return $el;
  }

  diff(newVNode: VElementNode): TPatch {
    return ($el) => {
      const attrsPatch = this.patchAttributes(newVNode.attributes);
      const listenersPatch = this.patchListeners(newVNode.listeners);

      attrsPatch($el as HTMLElement);
      listenersPatch($el as HTMLElement);
      return $el;
    };
  }

  isSimilar(newVNode: VElementNode) {
    return this.tagName === newVNode.tagName;
  }

  destroy() {
    return ($el: HTMLElement) => {
      Object.keys(this.listeners).forEach((eventName) => {
        $el.removeEventListener(eventName, this.listeners[eventName] as EventListener);
      });
      return $el;
    };
  }

  patchAttributes(newAttributes: TAttrs) {
    const patches: TPatch[] = [];

    Object.keys(this.attributes).forEach((attr) => {
      if (!newAttributes.hasOwnProperty(attr)) {
        patches.push(($el: HTMLElement) => {
          $el.removeAttribute(attr);
        });
      }
    });

    Object.keys(newAttributes).forEach((attr) => {
      if (newAttributes[attr] !== this.attributes[attr]) {
        patches.push(($el: HTMLElement) => {
          $el.setAttribute(attr, String(newAttributes[attr]));
        });
      }
    });


    return ($el: HTMLElement) => {
      patches.forEach((patch) => patch($el));
    };
  }

  patchListeners(newListeners: TListeners) {
    const patches: TPatch[] = [];

    Object.keys(this.listeners).forEach((eventName) => {
      if (!newListeners.hasOwnProperty(eventName)) {
        patches.push(($el: HTMLElement) => {
          $el.removeEventListener(eventName, this.listeners[eventName] as EventListener);
        });
      }
    });

    Object.keys(newListeners).forEach((eventName) => {
      if (!this.listeners.hasOwnProperty(eventName)) {
        patches.push(($el: HTMLElement) => {
          $el.addEventListener(eventName, newListeners[eventName] as EventListener);
        });
      }
      else if (newListeners[eventName] !== this.listeners[eventName]) {
        patches.push(($el: HTMLElement) => {
          $el.removeEventListener(eventName, this.listeners[eventName] as EventListener);
          $el.addEventListener(eventName, newListeners[eventName] as EventListener);
        });
      }
    });


    return ($el: HTMLElement) => {
      patches.forEach((patch) => patch($el));
    };
  }
};
