import { get } from '../../utils/get.js';
const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

export default class VNode {
  static NODE_TYPES = {
    TEXT_NODE: 1,
    ELEMENT_NODE: 2,
    COMPONENT_NODE: 3,
  };

  meta = {};
  el = null;

  constructor(nodeType) {
    this.meta.nodeType = nodeType;
  }

  render() {}

  _setValuesFromContext(str, ctx) {
    let result = str;
    let key = null;

    while ((key = TEMPLATE_REGEXP.exec(result))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue);
        result = result.replace(new RegExp(key[0], "gi"), data);
      }
    }

    return result;
  }

  show() {}
  
  hide() {}
};