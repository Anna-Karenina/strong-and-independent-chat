import VNode, { NodeType } from './VNode.js';
export default class VTextNode extends VNode {
    constructor(text) {
        super(NodeType.TextNode);
        this.text = '';
        this.meta.text = text;
    }
    render(ctx) {
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
//# sourceMappingURL=VTextNode.js.map