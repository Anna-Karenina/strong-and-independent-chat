import {ComponentConstructor} from '@core/component'
import Route from './Route';

export default class Router {
  static __instance: Router;
  rootQuery: string;
  routes: Route[];
  history: History;
  currentRoute: Route | null;
  fallBackRoute: Route | null;


  constructor(rootQuery?: string) {
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

  use(pathname: string, component: ComponentConstructor) {
    const route = new Route(pathname, component, {rootQuery: this.rootQuery});
    this.routes.push(route);
  
    return this;
  }

  fallback(component: ComponentConstructor) {
    this.fallBackRoute = new Route('/404', component, {rootQuery: this.rootQuery});
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Document).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    if (route) {
      this.currentRoute = route;
      route.render();
    } else if (this.fallBackRoute) {
      this.currentRoute = this.fallBackRoute;
      this.fallBackRoute.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(window.location.pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
