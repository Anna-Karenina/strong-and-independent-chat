import VNode, { NodeType } from './VNode.js';
import { getTagMeta, IMetaAttribute, IMetaListener } from '../utils/meta.js';
import { get, isEqual } from '/core/utils/index.js';

interface IMeta {
  listeners: IMetaListener [],
  attributes: IMetaAttribute [],
  [key: string]: any,
};

interface IAttribute {
  name: string,
  value: any,
};

interface IListener {
  event: string,
  handler: Function,
};

interface IState {
  attributes: IAttribute [],
  classes: string [],
};

export default class VElementNode extends VNode {
  el: HTMLElement | null;

  children: VNode[] = [];

  meta: IMeta;

  state: IState = {
    attributes: [],
    classes: [],
  };

  listeners: IListener[] = [];

  constructor(openTag: string) {
    super(NodeType.ElementNode);
    this.getMetaFromTag(openTag);
  }

  private getMetaFromTag(tag: string) {
    Object.assign(this.meta, getTagMeta(tag));
  }

  private computeState(ctx: object): IState {
    const processedClassName = this.setValuesFromContext(this.meta.className, ctx, '');
    const classes = processedClassName.split(/\s+/).filter((v) => v);

    const attributes = this.meta.attributes.map(({ name, value }) => ({
      name,
      value: this.setValuesFromContext(value, ctx, '')
    }));

    return { attributes, classes };
  }

  private addClasses(newState: IState) {
    if (!this.el) return;
    if (isEqual(newState.classes, this.state.classes)) return;

    this.state.classes.forEach((className) => this.el && this.el.classList.remove(className));
    newState.classes.forEach((className) => this.el && this.el.classList.add(className));
  }

  private setAttrs(newState: IState) {
    if (!this.el) return;
    if (isEqual(newState.attributes, this.state.attributes)) return;

    this.state.attributes.forEach(({ name }) => this.el && this.el.removeAttribute(name));
    newState.attributes.forEach(({ name, value }) => this.el && this.el.setAttribute(name, value));
  }

  private setListeners(ctx: object) {
    if (this.listeners.length) return;

    this.meta.listeners.forEach(({ event, handlerName }) => {
      const handler = get(ctx, handlerName) as Function;
      this.el && this.el.addEventListener(event, handler as EventListener);
      this.listeners.push({ event, handler });
    });
  }

  render(ctx: object) {
    let firstRender = false;
    if (!this.el) {
      this.el = document.createElement(this.meta.tagName);
      firstRender = true;
    }

    const newState = this.computeState(ctx);
    this.setListeners(ctx);

    this.addClasses(newState);
    this.setAttrs(newState);

    this.children.forEach((child) => {
      const renderedChild = child.render(ctx);
      if (firstRender && this.el) {
        this.el.appendChild(renderedChild);
      }
    });

    this.state = newState;
    return this.el;
  }

  setChildren(children: VNode [] = []) {
    this.children = children;
  }
};
