import VNode, {NodeType} from './VNode.js';
import {TSemanticNode, TAttrs, TListeners, TCtx} from '../types/index.js';
import {parseAttributes, parseListeners} from '../utils/attrs.js';

export default class VElementNode extends VNode {
  tagName: string;
  children: VNode[]
  attributes: TAttrs;
  listeners: TListeners;

  constructor(semanticNode: TSemanticNode, ctx: TCtx, children: VNode[] = []) {
    super(NodeType.ElementNode);
    this.tagName = semanticNode.type;
    this.children = children;

    this.attributes = parseAttributes(semanticNode.attrs, ctx);
    this.listeners = parseListeners(semanticNode.attrs, ctx);
  }

  render() {
    const $el = document.createElement(this.tagName);

    return $el;
  }
};
