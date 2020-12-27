import Router from '../Router.js';
import Component from '../../component/Component.js';
import Templator from '../../templator/Templator.js';

class Auth extends Component {
  constructor (props: any) {
    super(props);
  }

  render() {
    return Templator.compile('<div class="auth"></div>')({});
  }
}

class Chats extends Component {
  constructor (props: any) {
    super(props);
  }

  render() {
    return Templator.compile('<div class="chats"></div>')({});
  }
}

class Fallback extends Component {
  constructor (props: any) {
    super(props);
  }

  render() {
    return Templator.compile('<div class="fallback"></div>')({});
  }
}

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'

    router = new Router('#app');
    router
      .use('/auth', Auth)
      .use('/chats', Chats)
      .fallback(Fallback)
      .start();
  });

  test('render auth page on /auth path', () => {
    router.go('/auth');
    const page = document.getElementById('app')?.firstChild as HTMLElement;

    expect(window.location.pathname).toEqual('/auth');
    expect(page.classList.contains('auth')).toEqual(true);
    //@ts-ignore
    expect(router.currentRoute.componentClass).toEqual(Auth);
  });

  test('render chats page on /chats path', () => {
    router.go('/chats');
    const page = document.getElementById('app')?.firstChild as HTMLElement;

    expect(window.location.pathname).toEqual('/chats');
    expect(page.classList.contains('chats')).toEqual(true);
    //@ts-ignore
    expect(router.currentRoute.componentClass).toEqual(Chats);
  });

  test('previos page remove from DOM when path changing', () => {
    router.go('/chats');
    router.go('/auth');

    const app = document.getElementById('app') as HTMLElement;
    const page = app.firstChild as HTMLElement;

    expect(app.childNodes.length).toEqual(1);
    expect(page.classList.contains('auth')).toEqual(true);
    expect(page.classList.contains('chats')).toEqual(false);
  });

  test('render fallback page if route not exist', () => {
    router.go('/notexist');
    const page = document.getElementById('app')?.firstChild as HTMLElement;

    expect(window.location.pathname).toEqual('/notexist');
    expect(page.classList.contains('fallback')).toEqual(true);
    //@ts-ignore
    expect(router.currentRoute.componentClass).toEqual(Fallback);
  });
});
