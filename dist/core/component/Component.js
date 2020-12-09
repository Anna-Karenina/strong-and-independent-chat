import EventBus from '../bus/index.js';
import { isEqual, deepClone } from '../../core/utils/index.js';
;
export default class Component {
    constructor(props = {}) {
        this._element = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            const oldProps = this.props;
            this.props = deepClone({ ...oldProps, ...nextProps });
            this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps);
        };
        const eventBus = new EventBus();
        this.props = this.makePropsProxy(props);
        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        eventBus.emit(Component.EVENTS.INIT);
    }
    registerEvents(eventBus) {
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
    componentDidMount() { }
    ;
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        return !isEqual(oldProps, newProps);
    }
    get element() {
        return this._element;
    }
    _render() {
        const el = this.render();
        if (!this._element) {
            this._element = el;
        }
    }
    getContent() {
        return this.element;
    }
    makePropsProxy(props) {
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('нет доступа');
            }
        });
    }
    show() {
        if (!this._element)
            return;
        this._element.classList.remove('hidden');
    }
    hide() {
        if (!this._element)
            return;
        this._element.classList.add('hidden');
    }
}
Component.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
};
//# sourceMappingURL=Component.js.map