import {get} from '../../utils/get.js';
import VNode, {NodeType} from './VNode.js';
import {TSemanticNode, TCtx} from '../types/index.js';

export default class VTextNode extends VNode {
  textContent: string = '';

  constructor(semanticNode: TSemanticNode, ctx: TCtx) {
    super(NodeType.TextNode);

    const textContent = String(semanticNode.attrs.textContent);
    this.buildTextContentFromCtx(textContent, ctx)
  }

  private buildTextContentFromCtx(str: string, ctx: TCtx) {
    const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    let result = str;
    let key = null;

    while ((key = TEMPLATE_REGEXP.exec(result))) {
      if (key && key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue, '');
        
        result = result.replace(new RegExp(key[0], "gi"), String(data));
      }
    }

    this.textContent = result;
  }

  render() {
    const $el = document.createTextNode(this.textContent);

    return $el;
  }
}