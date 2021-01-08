import {get} from '../../utils/get';
import VNode, {NodeType} from './VNode';
import {TSemanticNode, TCtx, TPatch} from '../types/index';

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

  diff(newVNode: VTextNode): TPatch {
    return ($el) => {
      if (newVNode.textContent !== this.textContent) {
        $el.textContent = newVNode.textContent;
      }
      return $el;
    };
  }

  isSimilar() {
    return true;
  }
}