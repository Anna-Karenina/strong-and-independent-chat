import VNode from './VNode.js';
import { getTagMeta } from '../utils/meta.js';

export default class VComponentNode extends VNode {
  _Component = null;
  _instance = null;

  constructor(openTag, Component) {
    super(VNode.NODE_TYPES.COMPONENT_NODE);

    this._getMetaFromTag(openTag);
    this._Component = Component;
  }

  _getMetaFromTag(tag) {
    const { attributes: props } = getTagMeta(tag);
    this.meta.props = props;
  }

  render(ctx) {
    const props = this.meta.props.reduce((acc, { name, value }) => {
      return { ...acc, [name]: this._setValuesFromContext(value, ctx) };
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

  show() {
    this._instance && this._instance.show();
  }

  hide() {
    this._instance && this._instance.hide();
  }
}