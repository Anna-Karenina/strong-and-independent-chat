import {buildSemanticTree} from './utils/semantic';
import {buildVirtualTree} from './utils/virtual';
import {ComponentConstructor} from '../component/index';
import {TSemanticNode, TCtx} from './types/index';

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

    return (ctx: TCtx) => {
      const [virtualNode] = buildVirtualTree(semanticRoot, ctx);
      return virtualNode;
    };
  }
}
