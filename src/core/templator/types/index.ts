import {ComponentConstructor} from '@core/component';

export type TTemplatorComponents = Record<string, ComponentConstructor>;

export type TAttrs = Record<string, unknown>

export type TCtx = Record<string, unknown>

export type TListeners = Record<string, (...args: unknown[]) => void>

export type TPatch = ($el: HTMLElement | Text) => HTMLElement | Text | void;

export interface TSemanticNode {
  type: string,
  attrs: TAttrs,
  children: TSemanticNode[],
}
