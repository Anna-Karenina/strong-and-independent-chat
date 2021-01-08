import Component, {ComponentConstructor} from '@core/component'
import {render} from '@core/templator';

interface IRouteProps {
  rootQuery: string,
  [key: string]: unknown,
}

export default class Route {
  private pathname: string;
  private componentClass: ComponentConstructor;
  private component: Component | null;
  private props: IRouteProps

  constructor(pathname: string, view: ComponentConstructor, props: IRouteProps) {
    this.pathname = pathname;
    this.componentClass = view;
    this.component = null;
    this.props = props;
  }

  navigate(pathname: string) {
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

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    const {rootQuery, ...restProps} = this.props;
    this.component = new this.componentClass(restProps);
    render(rootQuery, this.component);
  }

  update() {
    if (!this.component) return;
    
    const {rootQuery, ...restProps} = this.props;
    this.component.setProps(restProps);
  }
}