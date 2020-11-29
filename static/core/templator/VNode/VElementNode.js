import VNode from './VNode.js';
import { getTagMeta } from '../utils/meta.js';
import { get } from '../../utils/get.js';

export default class VElementNode extends VNode {
  children = [];

  constructor(openTag) {
    super(VNode.NODE_TYPES.ELEMENT_NODE);
    this._getMetaFromTag(openTag);
  }

  _getMetaFromTag(tag) {
    Object.assign(this.meta, getTagMeta(tag));
  }

  _addClasses(ctx) {
    if (!this.el || !this.meta.className) return;

    const processedClassName = this._setValuesFromContext(this.meta.className, ctx);
    processedClassName
      .split(/\s+/)
      .filter((v) => v)
      .forEach((className) => {
        this.el.classList.add(className)
      });
  }

  _setAttrs(ctx) {
    if (!this.el) return;

    this.meta.attributes.forEach(({ name, value }) => {
      const processedAttrValue = this._setValuesFromContext(value, ctx);
      this.el.setAttribute(name, processedAttrValue);
    });
  }

  _setListeners(ctx) {
    this.meta.listeners.forEach(({ event, handlerName }) => {
      const handler = get(ctx, handlerName);
      this.el.addEventListener(event, handler);
    });
  }

  render(ctx) {
    this.el = document.createElement(this.meta.tagName);
    this._addClasses(ctx);
    this._setAttrs(ctx);
    this._setListeners(ctx);

    this.children.forEach((child) => this.el.appendChild(child.render(ctx)));
    return this.el;
  }

  setChildren(children = []) {
    this.children = children;
  }
}