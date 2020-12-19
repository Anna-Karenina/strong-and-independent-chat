import {buildSemanticTree} from './utils/semantic.js';
import {ComponentConstructor} from '../component/index.js';
import {TSemanticNode} from './types/index.js';

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
}
