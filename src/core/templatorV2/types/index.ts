import {ComponentConstructor} from '../../componentV2/index.js';

export type TTemplatorComponents = Record<string, ComponentConstructor>;

export type TAttrs = Record<string, unknown>

export type TCtx = Record<string, unknown>

export type TListeners = Record<string, Function>

export interface TSemanticNode {
  type: string,
  attrs: TAttrs,
  children: TSemanticNode[],
};
