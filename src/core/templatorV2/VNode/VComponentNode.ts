import VNode, {NodeType} from './VNode.js';
import Component from '../../component/index.js';
import {TSemanticNode, TAttrs, TCtx} from '../types/index.js';
import {parseAttributes} from '../utils/attrs.js';

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
    return this.instance?.getContent() || null;
  }
}