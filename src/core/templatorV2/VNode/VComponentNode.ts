import VNode, {NodeType} from './VNode.js';
import Component from '../../componentV2/index.js';
import {TSemanticNode, TAttrs, TCtx} from '../types/index.js';
import {parseAttributes} from '../utils/attrs.js';
import {renderComponent} from '../utils/render.js';

export default class VComponentNode extends VNode {
  private instantiate: Function;
  instance: Component | null = null;
  props: TAttrs;

  constructor(semanticNode: TSemanticNode, ctx: TCtx) {
    super(NodeType.ComponentNode);
    this.instantiate = semanticNode.attrs.__instantiate as Function;

    this.props = parseAttributes(semanticNode.attrs, ctx);
  }

  render() {
    this.instance = this.instantiate(this.props);
    return renderComponent(this.instance as Component);
  }
}