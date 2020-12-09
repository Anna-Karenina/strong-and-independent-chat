import VNode, {NodeType} from './VNode.js';

export default class VTextNode extends VNode {
  text = '';

  constructor(text: string) {
    super(NodeType.TextNode);
    this.meta.text = text;
  }

  render(ctx: object) {
    if (!this.el) {
      this.el = document.createTextNode('');
    }

    const newText = this.setValuesFromContext(this.meta.text, ctx);
    if (this.text !== newText) {
      this.el.textContent = newText;
    }

    this.text = newText;
    return this.el;
  }
}