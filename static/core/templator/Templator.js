import { cutTextNode, cutElementNode } from './utils/cut.js';

export default class Templator {
  _root = null;

  constructor(template, opts = {}) {
    const { components = {} } = opts;
    const [root, ...restNodes] = this._buildHtmlNodes(template, components);
    if (restNodes.length) throw new Error('Шаблон должен иметь один корневой элемент');
    
    this._root = root;
    console.log(root);
  }

  _buildHtmlNodes (template, components) {
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
  
      const [element, restTemplate] = cutElementNode(rowTemplate, components);
      const { node, content = '' } = element;

      node.setChildren(this._buildHtmlNodes(content, components));
      nodes.push(node);

      rowTemplate = restTemplate.trim();
    }
  
    return nodes;
  };

  render(ctx = {}) {
    return this._root.render(ctx);
  }

  getRoot() {
    return this._root;
  }
}
