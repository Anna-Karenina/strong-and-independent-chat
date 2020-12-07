import { get } from '../../utils/get.js';
;
export var NodeType;
(function (NodeType) {
    NodeType[NodeType["TextNode"] = 1] = "TextNode";
    NodeType[NodeType["ElementNode"] = 2] = "ElementNode";
    NodeType[NodeType["ComponentNode"] = 3] = "ComponentNode";
})(NodeType || (NodeType = {}));
;
export default class VNode {
    constructor(nodeType) {
        this.meta = {};
        this.el = null;
        this.meta.nodeType = nodeType;
    }
    setValuesFromContext(str, ctx, defaultValue) {
        const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        let result = str;
        let key = null;
        while ((key = TEMPLATE_REGEXP.exec(result))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = get(ctx, tmplValue, defaultValue);
                if (typeof data !== 'string') {
                    return data;
                }
                result = result.replace(new RegExp(key[0], "gi"), data);
            }
        }
        return result;
    }
}
;
//# sourceMappingURL=VNode.js.map