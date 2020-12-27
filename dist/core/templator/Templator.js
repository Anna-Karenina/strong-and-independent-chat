import { buildSemanticTree } from './utils/semantic.js';
import { buildVirtualTree } from './utils/virtual.js';
;
;
export default class Templator {
    static compile(template, opts = {}) {
        const { components = {} } = opts;
        const semanticRoot = buildSemanticTree(template, components);
        return (ctx) => {
            const [virtualNode] = buildVirtualTree(semanticRoot, ctx);
            return virtualNode;
        };
    }
}
//# sourceMappingURL=Templator.js.map