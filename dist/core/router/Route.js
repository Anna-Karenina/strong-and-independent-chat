import { render } from '../templator/index.js';
export default class Route {
    constructor(pathname, view, props) {
        this.pathname = pathname;
        this.componentClass = view;
        this.component = null;
        this.props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this.component) {
            this.component.destroy();
        }
    }
    match(pathname) {
        return pathname === this.pathname;
    }
    render() {
        const { rootQuery, ...restProps } = this.props;
        this.component = new this.componentClass(restProps);
        render(rootQuery, this.component);
    }
    update() {
        if (!this.component)
            return;
        const { rootQuery, ...restProps } = this.props;
        this.component.setProps(restProps);
    }
}
//# sourceMappingURL=Route.js.map