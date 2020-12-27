import EventBus from '../bus/index.js';
import { diff, cleanerDom } from '../templator/index.js';
import { isEqual, deepClone } from '../utils/index.js';
;
;
export default class Component {
    constructor(props) {
        this.state = {};
        this._element = null;
        this._virtualNode = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            const oldProps = this.props;
            this.props = nextProps;
            this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this.state);
        };
        this.setState = (nextState) => {
            if (!nextState) {
                return;
            }
            const oldState = this.state;
            this.state = deepClone({ ...oldState, ...nextState });
            this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, oldState);
        };
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
        }
        else {
            this._element = el;
        }
    }
    get virtualNode() {
        return this._virtualNode;
    }
    set virtualNode(virtualNode) {
        this._virtualNode = virtualNode;
    }
    registerEvents(eventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_BD, this.beforeDestroy.bind(this));
    }
    init() { }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() { }
    ;
    _componentDidUpdate(oldProps, oldState) {
        const response = this.componentShouldUpdate(oldProps, oldState);
        if (response && this.virtualNode && this.element) {
            const newVirtualNode = this.render();
            const patch = diff(this.virtualNode, newVirtualNode);
            this.element = patch(this.element);
            this.virtualNode = newVirtualNode;
            this.componentDidUpdate(oldProps, oldState);
        }
    }
    componentDidUpdate(_oldProps, _oldState) { }
    ;
    componentShouldUpdate(oldProps, oldState) {
        return !isEqual(oldProps, this.props) || !isEqual(oldState, this.state);
    }
    beforeDestroy() { }
    destroy() {
        this.eventBus().emit(Component.EVENTS.FLOW_BD);
        const clean = cleanerDom(this.virtualNode);
        clean(this.element);
    }
    makePropsProxy(props) {
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('нет доступа');
            }
        });
    }
    show() {
        var _a;
        if (!this._element)
            return;
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    }
    hide() {
        var _a;
        if (!this._element)
            return;
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
}
Component.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_BD: "flow:before-destroy",
};
//# sourceMappingURL=Component.js.map