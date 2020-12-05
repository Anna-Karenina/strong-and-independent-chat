import VNode, { NodeType } from './VNode.js';
import { getTagMeta, IMetaAttribute } from '../utils/meta.js';

interface IProps {
  [key: string]: any,
};

interface IMeta {
  props: IMetaAttribute [],
  [key: string]: any,
};

export default class VComponentNode extends VNode {
  meta: IMeta;
  _Component: any = null;
  _instance: any = null;

  constructor(openTag: string, Component: any) {
    super(NodeType.ComponentNode);

    this.getMetaFromTag(openTag);
    this._Component = Component;
  }

  private getMetaFromTag(tag: string) {
    const { attributes: props } = getTagMeta(tag);
    this.meta.props = props;
  }

  render(ctx: object) {
    const props: IProps = this.meta.props.reduce((acc: IProps, { name, value }) => {
      return { ...acc, [name]: this.setValuesFromContext(value, ctx) };
    }, {});

    if (!this._instance) {
      this._instance = new this._Component(props);
    } else {
      this._instance.setProps(props);
    }

    return this._instance.getContent();
  }

  //maybe later...
  setChildren() {}
}