import Component from '../../component/index.js';
import VNode from '../VNode/VNode.js';
import {TSemanticNode} from '../types/index.js';
import {buildSemanticTree} from '../utils/semantic.js';
import {buildVirtualTree, renderVirtualTree, diff, cleanerDom} from '../utils/virtual.js';

interface IButtonProps {
  onClick: Function,
};

class Button extends Component<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    const semanticNode = buildSemanticTree('<button @click="onClick">$children$</button>', {}) as TSemanticNode;

    const [vNode] = buildVirtualTree(semanticNode, {...this.props});
    return vNode;
  }
}

const template = `
  <div class="parent">
    <h1>{{ title }}</h1>

    <ul>
      <li $each="item in items">{{ item }}</li>
    </ul>

    <custom-button :onClick="onClick">Click me!</custom-button>
  </div>
`;

const semanticNode = buildSemanticTree(template, {
  'custom-button': Button as any,
}) as TSemanticNode;

const renderTemplate = (ctx: any): [VNode, HTMLElement] => {
  const [vNode] = buildVirtualTree(semanticNode, ctx);
  const $el = renderVirtualTree(vNode) as HTMLElement;

  return [vNode, $el];
};

describe('Templator: render', () => {
  const title = 'Title';
  const items = [
    'Item 1',
    'Item 2',
  ];

  describe('Template rendering correctly', () => {
    const onClick = jest.fn();
    const [, $el] = renderTemplate({title, items, onClick});

    test('root rendering corectly', () => {
      expect($el.getAttribute('class')).toEqual('parent');
      expect($el.tagName).toEqual('DIV');
    });

    test('children rendering corectly', () => {
      expect($el.childNodes.length).toEqual(3);
      expect(($el.childNodes[0] as HTMLElement).tagName).toEqual('H1');
      expect(($el.childNodes[1] as HTMLElement).tagName).toEqual('UL');
      expect(($el.childNodes[2] as HTMLElement).tagName).toEqual('BUTTON');
    });

    test('title rendering corectly', () => {
      const $h1 = $el.childNodes[0] as HTMLElement;

      expect($h1.childNodes.length).toEqual(1);
      expect($h1.childNodes[0].textContent).toEqual(title);
    });

    test('list rendering corectly', () => {
      const $ul = $el.childNodes[1] as HTMLElement;
      const $children = $ul.childNodes as NodeListOf<HTMLElement>;

      expect($children.length).toEqual(2);

      expect($children[0].tagName).toEqual('LI');
      expect($children[0].childNodes.length).toEqual(1);
      expect($children[0].childNodes[0].textContent).toEqual(items[0]);

      expect($children[1].tagName).toEqual('LI');
      expect($children[1].childNodes.length).toEqual(1);
      expect($children[1].childNodes[0].textContent).toEqual(items[1]);
    });

    test('button rendering corectly', () => {
      const $button = $el.childNodes[2] as HTMLElement;

      expect($button.childNodes.length).toEqual(1);
      expect($button.childNodes[0].textContent).toEqual('Click me!');
    });

    test('listeners is working', () => {
      const $button = $el.querySelector('button');
      $button?.click();

      //@ts-ignore
      expect(onClick.mock.calls.length).toEqual(1);
    });
  });

  describe('Diff change DOM correctly', () => {
    const onClick = jest.fn();
    let [vNode, $el] = renderTemplate({title, items, onClick});

    const newTitle = 'New title';
    const newItems: string[] = [];
    const newOnClick = jest.fn();

    const [newVNode] = buildVirtualTree(semanticNode, {
      title: newTitle,
      items: newItems,
      onClick: newOnClick,
    });

    const patch = diff(vNode, newVNode);
    $el = patch($el) as HTMLElement;

    test('title change corectly', () => {
      const $h1 = $el.childNodes[0] as HTMLElement;

      expect($h1.childNodes.length).toEqual(1);
      expect($h1.childNodes[0].textContent).toEqual(newTitle);
    });

    test('list change corectly', () => {
      const $ul = $el.childNodes[1] as HTMLElement;

      expect($ul.childNodes.length).toEqual(0);
    });

    test('listeners change corectly', () => {
      const $button = $el.querySelector('button');
      $button?.click();

      expect(onClick).toHaveBeenCalledTimes(0);
      expect(newOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('CleanerDOM work corectly', () => {
    const onClick = jest.fn();
    let [vNode, $el] = renderTemplate({title, items, onClick});

    test('after clean listeners is inactive', () => {
      const $button = $el.querySelector('button');

      $button?.click();
      expect(onClick).toHaveBeenCalledTimes(1);

      const clean = cleanerDom(vNode);
      clean($el);

      $button?.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});