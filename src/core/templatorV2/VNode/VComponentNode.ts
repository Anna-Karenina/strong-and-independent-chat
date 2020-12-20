import VNode, {NodeType} from './VNode.js';
import Component, {ComponentConstructor} from '../../componentV2/index.js';
import {TSemanticNode, TAttrs, TCtx, TPatch} from '../types/index.js';
import {parseAttributes} from '../utils/attrs.js';
import {renderComponent} from '../utils/render.js';

export default class VComponentNode extends VNode {
  private componentClass: ComponentConstructor;
  instance: Component | null = null;
  props: TAttrs;

  constructor(semanticNode: TSemanticNode, ctx: TCtx) {
    super(NodeType.ComponentNode);
    this.componentClass = semanticNode.attrs.__componentClass as ComponentConstructor;

    this.props = parseAttributes(semanticNode.attrs, ctx);
  }

  render() {
    this.instance = new this.componentClass(this.props);
    return renderComponent(this.instance as Component);
  }

  diff(newVNode: VComponentNode): TPatch {
    return ($el) => {
      newVNode.instance = this.instance;
      newVNode.instance?.setProps(newVNode.props);
      return $el;
    };
  }

  isSimilar(newVNode: VComponentNode) {
    return this.componentClass === newVNode.componentClass;
  }
}