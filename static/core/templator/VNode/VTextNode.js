import VNode from './VNode.js';

export default class VTextNode extends VNode {
  text = '';

  constructor(text) {
    super(VNode.NODE_TYPES.TEXT_NODE);
    this.text = text;
  }

  render(ctx = {}) {
    const processedText = this._setValuesFromContext(this.text, ctx);
    this.el = document.createTextNode(processedText);

    return this.el;
  }
}