import {get} from '../../utils/get.js';

interface IMeta {
  [key: string]: any,
};

export enum NodeType {
  TextNode = 1,
  ElementNode = 2,
  ComponentNode = 3,
};

export default abstract class VNode {
  protected meta: IMeta = {};
  
  el: HTMLElement | Text | null = null;

  constructor(nodeType: NodeType) {
    this.meta.nodeType = nodeType;
  }

  abstract render(ctx: object): any;

  protected setValuesFromContext(str: string, ctx: object, defaultValue?: any) {
    const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    let result = str;
    let key = null;

    while ((key = TEMPLATE_REGEXP.exec(result))) {
      if (key && key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue, defaultValue);
        if (typeof data !== 'string') {
          return data;
        }
        result = result.replace(new RegExp(key[0], "gi"), data);
      }
    }

    return result;
  }
};