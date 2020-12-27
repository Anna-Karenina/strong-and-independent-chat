import VNode, { NodeType } from './VNode.js';
import { parseAttributes } from '../utils/attrs.js';
import { renderComponent } from '../utils/render.js';
export default class VComponentNode extends VNode {
    constructor(semanticNode, ctx, children = []) {
        super(NodeType.ComponentNode);
        this.instance = null;
        this.componentClass = semanticNode.attrs.__componentClass;
        this.$children = children;
        this.props = parseAttributes(semanticNode.attrs, ctx);
    }
    render() {
        this.instance = new this.componentClass({ ...this.props, $children: this.$children });
        return renderComponent(this.instance);
    }
    diff(newVNode) {
        return ($el) => {
            var _a;
            newVNode.instance = this.instance;
            (_a = newVNode.instance) === null || _a === void 0 ? void 0 : _a.setProps({ ...newVNode.props, $children: newVNode.$children });
            return $el;
        };
    }
    isSimilar(newVNode) {
        return this.componentClass === newVNode.componentClass;
    }
    destroy() {
        return ($el) => {
            var _a;
            (_a = this.instance) === null || _a === void 0 ? void 0 : _a.destroy();
            return $el;
        };
    }
}
//# sourceMappingURL=VComponentNode.js.map