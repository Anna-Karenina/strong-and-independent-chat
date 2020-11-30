import { cutTextNode, cutElementNode } from './utils/cut.js';

export default class Templator {
  _root = null;

  constructor(template) {
    const [root, ...restNodes] = this._buildHtmlNodes(template);
    if (restNodes.length) throw new Error('Шаблон должен иметь один корневой элемент');
    
    this._root = root;
  }

  _buildHtmlNodes (template) {
    let rowTemplate = template.replace(/[\n\r]/g, '').trim();
    if (!rowTemplate) return [];
  
    const nodes = [];
  
    while(rowTemplate) {
      if (!rowTemplate.startsWith('<')) {
        const [element, restTemplate] = cutTextNode(rowTemplate);
        nodes.push(element.node);
        rowTemplate = restTemplate.trim();
        continue;
      }
  
      const [element, restTemplate] = cutElementNode(rowTemplate);
      const { node, content } = element;
      node.setChildren(this._buildHtmlNodes(content));
      nodes.push(node);
  
      rowTemplate = restTemplate.trim();
    }
  
    return nodes;
  };

  render(ctx = {}) {
    return this._root.render(ctx);
  }
}
