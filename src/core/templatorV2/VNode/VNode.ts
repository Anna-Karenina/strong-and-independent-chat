import {TPatch} from '../types/index.js';

export enum NodeType {
  TextNode = 1,
  ElementNode = 2,
  ComponentNode = 3,
};

export default abstract class VNode {
  nodeType: NodeType;

  children?: VNode [];

  constructor(nodeType: NodeType) {
    this.nodeType = nodeType; 
  }

  abstract render(): Element | Text | null;

  abstract diff(newVNode: VNode): TPatch;
}