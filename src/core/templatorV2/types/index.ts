import {ComponentConstructor} from '../../component/index.js';

export type TTemplatorComponents = Record<string, ComponentConstructor>;

export interface TSemanticNode {
  type: string,
  attrs: Record<string, unknown>,
  children: TSemanticNode[],
};
