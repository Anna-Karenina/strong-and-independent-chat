import EventBus from '../bus/index.js';
import VNode from '../templator/VNode/VNode.js';
import {diff, cleanerDom} from '../templator/index.js';
import {isEqual, deepClone} from '../utils/index.js';

export interface IProps {
  [key: string]: any,
};

export interface IState {
  [key: string]: unknown,
};

export default abstract class Component<P extends IProps = IProps, S extends IState = IState> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  props: P;

  state: S = {} as S;

  private eventBus: () => EventBus

  private _element: HTMLElement | Text | null = null;

  private _virtualNode: VNode | null = null;

  constructor(props: P) {
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
  }

  protected componentDidMount() {};

  private _componentDidUpdate(oldProps: P, oldState: S) {
    const response = this.componentShouldUpdate(oldProps, oldState);

    if (response && this.virtualNode && this.element) {
      const newVirtualNode = this.render();
      const patch = diff(this.virtualNode, newVirtualNode);

      this.element = patch(this.element) as HTMLElement;
      this.virtualNode = newVirtualNode;

      this.componentDidUpdate(oldProps, oldState);
    }
  }
  
  protected componentDidUpdate(_oldProps: P, _oldState: S) {};

  protected componentShouldUpdate(oldProps: P, oldState: S): boolean {
    return !isEqual(oldProps, this.props) || !isEqual(oldState, this.state);
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    const oldProps = this.props;
    this.props = deepClone<P>({...oldProps, ...nextProps});
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this.state);
  };

  setState = (nextState: Partial<S>) => {
    if (!nextState) {
      return;
    }

    const oldState = this.state;
    this.state = deepClone<S>({...oldState, ...nextState});
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, oldState);
  };

  get element() {
    return this._element;
  }

  set element(el) {
    if (!this._element) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    this._element = el;
  }

  get virtualNode() {
    return this._virtualNode;
  }

  set virtualNode(virtualNode) {
    this._virtualNode = virtualNode;
  }

  _render() {}

  abstract render(): VNode;

  private makePropsProxy(props: P) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  show() {
    if (!this._element) return;
    // this._element.classList.remove('hidden');
  }

  hide() {
    if (!this._element) return;
    // this._element.classList.add('hidden');
  }

  destroy() {
    const clean = cleanerDom(this.virtualNode as VNode);
    clean(this.element as HTMLElement);
  }
}