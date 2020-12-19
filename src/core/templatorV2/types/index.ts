import {ComponentConstructor} from '../../component/index.js';

export type TTemplatorComponents = Record<string, ComponentConstructor>;

export type TAttrs = Record<string, unknown>

export interface TSemanticNode {
  type: string,
  attrs: TAttrs,
  children: TSemanticNode[],
};
