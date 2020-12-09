import { cutTextNode, cutElementNode } from './utils/cut.js';
;
;
export default class Templator {
    constructor(template, opts = {}) {
        this._root = null;
        const { components = {} } = opts;
        const root = this.buildHtmlNodes(template, components);
        this._root = root;
        console.log(root);
    }
    buildHtmlNodes(template, components, root = true) {
        let rowTemplate = template.replace(/[\n\r]/g, '').trim();
        if (!rowTemplate)
            return [];
        const nodes = [];
        while (rowTemplate) {
            if (!rowTemplate.startsWith('<')) {
                const [element, restTemplate] = cutTextNode(rowTemplate);
                if (root) {
                    return element.node;
                }
                nodes.push(element.node);
                rowTemplate = restTemplate.trim();
                continue;
            }
            const [element, restTemplate] = cutElementNode(rowTemplate, components);
            const { node, content = '' } = element;
            node.setChildren(this.buildHtmlNodes(content, components, false));
            if (root)
                return node;
            nodes.push(node);
            rowTemplate = restTemplate.trim();
        }
        return nodes;
    }
    ;
    render(ctx = {}) {
        return (this._root && this._root.render(ctx));
    }
    getRoot() {
        return this._root;
    }
}
//# sourceMappingURL=Templator.js.map