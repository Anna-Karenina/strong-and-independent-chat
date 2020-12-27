export var NodeType;
(function (NodeType) {
    NodeType[NodeType["TextNode"] = 1] = "TextNode";
    NodeType[NodeType["ElementNode"] = 2] = "ElementNode";
    NodeType[NodeType["ComponentNode"] = 3] = "ComponentNode";
})(NodeType || (NodeType = {}));
;
export default class VNode {
    constructor(nodeType) {
        this.nodeType = nodeType;
    }
    destroy() {
        return ($el) => $el;
    }
}
//# sourceMappingURL=VNode.js.map