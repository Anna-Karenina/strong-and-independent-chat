import { get } from '../../utils/get.js';
import VNode, { NodeType } from './VNode.js';
export default class VTextNode extends VNode {
    constructor(semanticNode, ctx) {
        super(NodeType.TextNode);
        this.textContent = '';
        const textContent = String(semanticNode.attrs.textContent);
        this.buildTextContentFromCtx(textContent, ctx);
    }
    buildTextContentFromCtx(str, ctx) {
        const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        let result = str;
        let key = null;
        while ((key = TEMPLATE_REGEXP.exec(result))) {
            if (key && key[1]) {
                const tmplValue = key[1].trim();
                const data = get(ctx, tmplValue, '');
                result = result.replace(new RegExp(key[0], "gi"), String(data));
            }
        }
        this.textContent = result;
    }
    render() {
        const $el = document.createTextNode(this.textContent);
        return $el;
    }
    diff(newVNode) {
        return ($el) => {
            if (newVNode.textContent !== this.textContent) {
                $el.textContent = newVNode.textContent;
            }
            return $el;
        };
    }
    isSimilar() {
        return true;
    }
}
//# sourceMappingURL=VTextNode.js.map