import VNode, {NodeType} from './VNode';
import Component, {ComponentConstructor} from '../../component/index';
import {TSemanticNode, TAttrs, TCtx, TPatch} from '../types/index';
import {parseAttributes} from '../utils/attrs';
import {renderComponent} from '../utils/render';

export default class VComponentNode extends VNode {
  private componentClass: ComponentConstructor;
  instance: Component | null = null;
  $children: VNode[];
  props: TAttrs;

  constructor(semanticNode: TSemanticNode, ctx: TCtx, children: VNode[] = []) {
    super(NodeType.ComponentNode);
    this.componentClass = semanticNode.attrs.__componentClass as ComponentConstructor;

    this.$children = children;
    this.props = parseAttributes(semanticNode.attrs, ctx);
  }

  render() {
    this.instance = new this.componentClass({...this.props, $children: this.$children});
    return renderComponent(this.instance as Component);
  }

  diff(newVNode: VComponentNode): TPatch {
    return ($el) => {
      newVNode.instance = this.instance;
      newVNode.instance?.setProps({...newVNode.props, $children: newVNode.$children});
      return $el;
    };
  }

  isSimilar(newVNode: VComponentNode) {
    return this.componentClass === newVNode.componentClass;
  }

  destroy() {
    return ($el: HTMLElement) => {
      this.instance?.destroy();
      return $el;
    };
  }
}