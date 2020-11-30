import VNode from './VNode.js';

export default class VTextNode extends VNode {
  text = '';

  constructor(text) {
    super(VNode.NODE_TYPES.TEXT_NODE);
    this.meta.text = text;
  }

  render(ctx = {}) {
    if (!this.el) {
      this.el = document.createTextNode('');
    }

    const newText = this._setValuesFromContext(this.meta.text, ctx);
    if (this.text !== newText) {
      this.el.textContent = newText;
    }

    this.text = newText;
    return this.el;
  }
}