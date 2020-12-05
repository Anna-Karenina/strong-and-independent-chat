import VNode from './VNode/VNode.js';
import { cutTextNode, cutElementNode } from './utils/cut.js';
import { ComponentConstructor } from '../component/index.js';


interface IComponents {
  [key: string]: ComponentConstructor,
};
interface IOptions {
  components?: IComponents,
};

export default class Templator {
  private _root: VNode | null = null;

  constructor(template: string, opts: IOptions = {}) {
    const { components = {} } = opts;
    const [root, ...restNodes] = this._buildHtmlNodes(template, components);
    if (restNodes.length) throw new Error('Шаблон должен иметь один корневой элемент');
    
    this._root = root;
    console.log(root);
  }

  private _buildHtmlNodes (template: string, components: IComponents) {
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

  render(ctx: object = {}): HTMLElement | null {
    return (this._root && this._root.render(ctx));
  }

  getRoot() {
    return this._root;
  }
}
