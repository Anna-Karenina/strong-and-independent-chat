import {buildSemanticTree} from './utils/semantic.js';
import {buildVirtualTree} from './utils/virtual.js';
import {ComponentConstructor} from '../component/index.js';
import {TSemanticNode, TCtx} from './types/index.js';

interface IComponents {
  [key: string]: ComponentConstructor,
};
interface IOptions {
  components?: IComponents,
};

export default class Templator {
  private semanticRoot: TSemanticNode | null;

  constructor(template: string, opts: IOptions = {}) {
    const {components = {}} = opts;
    this.semanticRoot = buildSemanticTree(template, components) as TSemanticNode;

    console.log(this.semanticRoot);
  }

  render(ctx: TCtx) {
    if (!this.semanticRoot) return;
    const virtualRoot = buildVirtualTree(this.semanticRoot, ctx);
    console.log(virtualRoot);
  }
}
