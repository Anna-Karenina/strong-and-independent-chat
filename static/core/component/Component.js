import EventBus from '../bus/index.js';
import { isEqual } from '/core/utils/index.js';

export default class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element = null;

  constructor(props = {}, opts = {}) {
    const { templator = null } = opts;
    this._templator = templator;

    const eventBus = new EventBus();
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  get _root() {
    return this._templator && this._templator.getRoot();
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM, this.props);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return !isEqual(oldProps, newProps);
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    const oldProps = this.props;
    this.props = { ...oldProps, ...nextProps };
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const el = this.render();

    if (!this._element) {
      this._element = el;
    }
  }

	// Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  show() {
    this._root && this._root.show();
  }

  hide() {
    this._root && this._root.hide();
  }
}