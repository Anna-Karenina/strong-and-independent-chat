import {ComponentConstructor} from '../component/index.js'
import Route from './Route.js';

export default class Router {
  static __instance: Router;
  rootQuery: string;
  routes: Route[];
  history: History;
  currentRoute: Route | null;


  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, component: ComponentConstructor) {
    const route = new Route(pathname, component, {rootQuery: this.rootQuery});
    this.routes.push(route);
  
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
