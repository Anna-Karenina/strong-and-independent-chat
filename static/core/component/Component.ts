import EventBus from '../bus/index.js';
import { isEqual } from '../../core/utils/index.js';

export interface IProps {
  [key: string]: any,
};

export default abstract class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  props: IProps;

  private eventBus: () => EventBus

  private _element: HTMLElement | null = null;

  constructor(props: IProps = {}) {
    const eventBus = new EventBus();
    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private init() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM, this.props);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {};

  private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    return !isEqual(oldProps, newProps);
  }

  setProps = (nextProps: IProps) => {
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

  abstract render(): HTMLElement | null;

  getContent() {
    return this.element;
  }

  private makePropsProxy(props: IProps) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  show() {
    if (!this._element) return;
    this._element.style.display = '';
  }

  hide() {
    if (!this._element) return;
    this._element.style.display = 'none';
  }
}