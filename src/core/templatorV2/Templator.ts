import {buildSemanticTree} from './utils/semantic.js';
import {buildVirtualTree} from './utils/virtual.js';
import {ComponentConstructor} from '../componentV2/index.js';
import {TSemanticNode, TCtx} from './types/index.js';

interface IComponents {
  [key: string]: ComponentConstructor,
};
interface IOptions {
  components?: IComponents,
};

export default class Templator {
  static compile(template: string, opts: IOptions = {}) {
    const {components = {}} = opts;
    const semanticRoot = buildSemanticTree(template, components) as TSemanticNode;
    console.log(semanticRoot);

    return (ctx: TCtx) => {
      const [virtualNode] = buildVirtualTree(semanticRoot, ctx);
      return virtualNode;
    };
  }
}
