import VNode, { NodeType } from './VNode.js';
import { getTagMeta } from '../utils/meta.js';
;
export default class VComponentNode extends VNode {
    constructor(openTag, Component) {
        super(NodeType.ComponentNode);
        this._instance = null;
        this.getMetaFromTag(openTag);
        this._Component = Component;
    }
    getMetaFromTag(tag) {
        const { attributes: props } = getTagMeta(tag);
        this.meta.props = props;
    }
    render(ctx) {
        const props = this.meta.props.reduce((acc, { name, value }) => {
            return { ...acc, [name]: this.setValuesFromContext(value, ctx) };
        }, {});
        if (!this._instance) {
            this._instance = new this._Component(props);
        }
        else {
            this._instance.setProps(props);
        }
        return this._instance.getContent();
    }
    setChildren() { }
}
//# sourceMappingURL=VComponentNode.js.map