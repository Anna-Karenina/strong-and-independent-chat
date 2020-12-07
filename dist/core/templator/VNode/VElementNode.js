import VNode, { NodeType } from './VNode.js';
import { getTagMeta } from '../utils/meta.js';
import { get, isEqual } from '../../utils/index.js';
;
;
;
;
export default class VElementNode extends VNode {
    constructor(openTag) {
        super(NodeType.ElementNode);
        this.children = [];
        this.state = {
            attributes: [],
            classes: [],
        };
        this.listeners = [];
        this.getMetaFromTag(openTag);
    }
    getMetaFromTag(tag) {
        Object.assign(this.meta, getTagMeta(tag));
    }
    computeState(ctx) {
        const processedClassName = this.setValuesFromContext(this.meta.className, ctx, '');
        const classes = processedClassName.split(/\s+/).filter((v) => v);
        const attributes = this.meta.attributes.map(({ name, value }) => ({
            name,
            value: this.setValuesFromContext(value, ctx, '')
        }));
        return { attributes, classes };
    }
    addClasses(newState) {
        if (!this.el)
            return;
        if (isEqual(newState.classes, this.state.classes))
            return;
        this.state.classes.forEach((className) => this.el && this.el.classList.remove(className));
        newState.classes.forEach((className) => this.el && this.el.classList.add(className));
    }
    setAttrs(newState) {
        if (!this.el)
            return;
        if (isEqual(newState.attributes, this.state.attributes))
            return;
        this.state.attributes.forEach(({ name }) => this.el && this.el.removeAttribute(name));
        newState.attributes.forEach(({ name, value }) => this.el && this.el.setAttribute(name, value));
    }
    setListeners(ctx) {
        if (this.listeners.length)
            return;
        this.meta.listeners.forEach(({ event, handlerName }) => {
            const handler = get(ctx, handlerName);
            this.el && this.el.addEventListener(event, handler);
            this.listeners.push({ event, handler });
        });
    }
    render(ctx) {
        let firstRender = false;
        if (!this.el) {
            this.el = document.createElement(this.meta.tagName);
            firstRender = true;
        }
        const newState = this.computeState(ctx);
        this.setListeners(ctx);
        this.addClasses(newState);
        this.setAttrs(newState);
        this.children.forEach((child) => {
            const renderedChild = child.render(ctx);
            if (firstRender && this.el) {
                this.el.appendChild(renderedChild);
            }
        });
        this.state = newState;
        return this.el;
    }
    setChildren(children = []) {
        this.children = children;
    }
}
;
//# sourceMappingURL=VElementNode.js.map