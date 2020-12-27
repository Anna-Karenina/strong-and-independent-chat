import EventBus from '../bus/index.js';
import VNode from '../templator/VNode/VNode.js';
import {diff, cleanerDom} from '../templator/index.js';
import {isEqual, deepClone} from '../utils/index.js';

export interface IProps {
  [key: string]: any,
};

export interface IState {
  [key: string]: any,
};

export default abstract class Component<P extends IProps = IProps, S extends IState = IState> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_BD: "flow:before-destroy",
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

  get element() {
    return this._element;
  }

  set element(el) {
    if (!this._element) {
      this._element = el;
      this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    } else {
      this._element = el;
    }
  }

  get virtualNode() {
    return this._virtualNode;
  }

  set virtualNode(virtualNode) {
    this._virtualNode = virtualNode;
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_BD, this.beforeDestroy.bind(this));
  }

  private init() {}

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

  protected beforeDestroy() {}

  destroy() {
    this.eventBus().emit(Component.EVENTS.FLOW_BD);
    
    const clean = cleanerDom(this.virtualNode as VNode);
    clean(this.element as HTMLElement);
  }

  abstract render(): VNode;

  //метод setProps вызывается только шаблонизатором. Поэтому он полностью перезатирает пропсы, чтобы не осталось прошлых
  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    const oldProps = this.props;
    this.props = nextProps;
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

  private makePropsProxy(props: P) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  show() {
    if (!this._element) return;
    (this._element as HTMLElement)?.classList.remove('hidden');
  }

  hide() {
    if (!this._element) return;
    (this._element as HTMLElement)?.classList.add('hidden');
  }
}