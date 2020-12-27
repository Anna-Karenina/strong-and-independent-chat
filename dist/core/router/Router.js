import Route from './Route.js';
export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.fallBackRoute = null;
        this.rootQuery = rootQuery || '';
        Router.__instance = this;
    }
    use(pathname, component) {
        const route = new Route(pathname, component, { rootQuery: this.rootQuery });
        this.routes.push(route);
        return this;
    }
    fallback(component) {
        this.fallBackRoute = new Route('/404', component, { rootQuery: this.rootQuery });
        return this;
    }
    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        if (route) {
            this.currentRoute = route;
            route.render();
        }
        else if (this.fallBackRoute) {
            this.currentRoute = this.fallBackRoute;
            this.fallBackRoute.render();
        }
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(window.location.pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=Router.js.map