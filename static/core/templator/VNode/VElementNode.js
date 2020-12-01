import VNode from './VNode.js';
import { getTagMeta } from '../utils/meta.js';
import { get, isEqual } from '/core/utils/index.js';

export default class VElementNode extends VNode {
  _children = [];

  _state = {
    attributes: [],
    classes: [],
  };

  _listeners = [];

  constructor(openTag) {
    super(VNode.NODE_TYPES.ELEMENT_NODE);
    this._getMetaFromTag(openTag);
  }

  _getMetaFromTag(tag) {
    Object.assign(this.meta, getTagMeta(tag));
  }

  _computeState(ctx) {
    const processedClassName = this._setValuesFromContext(this.meta.className, ctx);
    const classes = processedClassName.split(/\s+/).filter((v) => v);

    const attributes = this.meta.attributes.map(({ name, value }) => ({
      name,
      value: this._setValuesFromContext(value, ctx)
    }));

    return { attributes, classes };
  }

  _addClasses(newState) {
    if (!this.el) return;
    if (isEqual(newState.classes, this._state.classes)) return;

    this._state.classes.forEach((className) => this.el.classList.remove(className));
    newState.classes.forEach((className) => this.el.classList.add(className));
  }

  _setAttrs(newState) {
    if (!this.el) return;
    if (isEqual(newState.attributes, this._state.attributes)) return;

    this._state.attributes.forEach(({ name }) => this.el.removeAttribute(name));
    newState.attributes.forEach(({ name, value }) => this.el.setAttribute(name, value));
  }

  _setListeners(ctx) {
    if (this._listeners.length) return;

    this.meta.listeners.forEach(({ event, handlerName }) => {
      const handler = get(ctx, handlerName);
      this.el.addEventListener(event, handler);
      this._listeners.push({ event, handler });
    });
  }

  render(ctx) {
    let firstRender = false;
    if (!this.el) {
      this.el = document.createElement(this.meta.tagName);
      firstRender = true;
    }

    const newState = this._computeState(ctx);
    this._setListeners(ctx);

    this._addClasses(newState);
    this._setAttrs(newState);

    this._children.forEach((child) => {
      const renderedChild = child.render(ctx);
      if (firstRender) {
        this.el.appendChild(renderedChild);
      }
    });

    this._state = newState;
    return this.el;
  }

  setChildren(children = []) {
    this._children = children;
  }
}