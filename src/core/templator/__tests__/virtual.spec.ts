import Component from '../../component/index';
import {NodeType} from '../VNode/VNode';
import VTextNode from '../VNode/VTextNode';
import VElementNode from '../VNode/VElementNode';
import VComponentNode from '../VNode/VComponentNode';
import {TSemanticNode} from '../types/index';
import {buildSemanticTree} from '../utils/semantic';
import {buildVirtualTree} from '../utils/virtual';

interface ITextComponentProps {
  text: string,
};

class TextComponent extends Component<ITextComponentProps> {
  constructor(props: ITextComponentProps) {
    super(props);
  }

  render() {
    const semanticNode = buildSemanticTree('<div>{{ text }}</div>', {}) as TSemanticNode;

    const [vNode] = buildVirtualTree(semanticNode, {
      text: this.props.text,
    });

    return vNode;
  }
}

describe('Templator: virtual', () => {
  describe('VTextNode', () => {
    const semanticTextNode = buildSemanticTree('Text', {}) as TSemanticNode;
    const semanticDynamicTextNode = buildSemanticTree('{{ text }}', {}) as TSemanticNode;

    test('instance of VTextNode', () => {
      const [vNode] = buildVirtualTree(semanticTextNode, {}) as VTextNode[];
      expect(vNode).toBeInstanceOf(VTextNode);
      expect(vNode.nodeType).toEqual(NodeType.TextNode);
    });
    
    test('creating text node with static text', () => {
      const [vNode] = buildVirtualTree(semanticTextNode, {}) as VTextNode[];

      expect(vNode.textContent).toEqual('Text');
    });

    test('creating text node with dynamic text', () => {
      const [vNode] = buildVirtualTree(semanticDynamicTextNode, {
        text: 'Some text',
      }) as VTextNode[];

      expect(vNode.textContent).toEqual('Some text');
    });

    test('creating text node without text from ctx', () => {
      const [vNode] = buildVirtualTree(semanticDynamicTextNode, {}) as VTextNode[];

      expect(vNode.textContent).toEqual('');
    });
  });

  describe('VElementNode', () => {
    const input = '<input :value="value" @input="onInput" name="static">'
    const semanticElementNode = buildSemanticTree(input, {}) as TSemanticNode;

    test('instance of VElementNode', () => {
      const [vNode] = buildVirtualTree(semanticElementNode, {}) as VElementNode[];
      expect(vNode).toBeInstanceOf(VElementNode);
      expect(vNode.nodeType).toEqual(NodeType.ElementNode);
    });

    test('has corectly tagName', () => {
      const [vNode] = buildVirtualTree(semanticElementNode, {}) as VElementNode[];
      expect(vNode.tagName).toEqual('input');
    });
    
    test('creating element node without ctx', () => {
      const [vNode] = buildVirtualTree(semanticElementNode, {}) as VElementNode[];

      expect(vNode.attributes).toEqual({
        name: 'static',
        value: null,
      });
    });

    test('creating element with ctx', () => {
      const onInput = () => {};
      const [vNode] = buildVirtualTree(semanticElementNode, {
        value: 'input value',
        onInput,
      }) as VElementNode[];

      expect(vNode.attributes).toEqual({
        name: 'static',
        value: 'input value',
      });

      expect(vNode.listeners).toEqual({input: onInput});
      expect(vNode.listeners.input).toEqual(onInput);
    });

    test('element has children', () => {
      const template = `
        <div>{{ text }}</div>
      `;
      const text = 'children';
      const semanticNode = buildSemanticTree(template, {}) as TSemanticNode;
      const [vNode] = buildVirtualTree(semanticNode, {text}) as VElementNode[];

      expect(vNode.children.length).toEqual(1);
      expect(vNode.children[0].nodeType).toEqual(NodeType.TextNode);
      expect((vNode.children[0] as VTextNode).textContent).toEqual(text);
    });
  });

  describe('VComponentNode', () => {
    const template = '<component :text="text" />'
    const semanticComponentNode = buildSemanticTree(template, {
      'component': TextComponent as any,
    }) as TSemanticNode;

    test('instance of VComponentNode', () => {
      const [vNode] = buildVirtualTree(semanticComponentNode, {}) as VComponentNode[];
      expect(vNode).toBeInstanceOf(VComponentNode);
      expect(vNode.nodeType).toEqual(NodeType.ComponentNode);
    });
    
    test('creating component node without ctx', () => {
      const [vNode] = buildVirtualTree(semanticComponentNode, {}) as VComponentNode[];

      expect(vNode.props).toEqual({
        text: null,
      });
    });

    test('creating component with ctx', () => {
      const text = 'Text';
      const [vNode] = buildVirtualTree(semanticComponentNode, {text}) as VComponentNode[];

      expect(vNode.props).toEqual({
        text,
      });
    });
  });

  describe('$children$', () => {
    test('$children is rendering', () => {
      const slotSemanticNode = buildSemanticTree(`<div class="slot">$children$</div>`, {}) as TSemanticNode;
      const childSemanticNode = buildSemanticTree('Hello, i am {{ name }}', {}) as TSemanticNode;

      const [childVNode] = buildVirtualTree(childSemanticNode, {name: 'Bob'}) as VTextNode[];
      const [slotVNode] = buildVirtualTree(slotSemanticNode, {$children: [childVNode]}) as VElementNode[];

      expect(slotVNode.attributes.class).toEqual('slot');
      expect(slotVNode.children.length).toEqual(1);

      expect(slotVNode.children[0].nodeType).toEqual(NodeType.TextNode);
      expect((slotVNode.children[0] as VTextNode).textContent).toEqual('Hello, i am Bob');
    });
  })

  describe('$each', () => {
    const template = `
        <ul>
          <li $each="item in items">{{ item.text }}</li>
        </ul>
      `;
    const semanticNode = buildSemanticTree(template, {}) as TSemanticNode;

    test('rendering list', () => {
      const [vNode] = buildVirtualTree(semanticNode, {
        items: [
          {text: '1'},
          {text: '2'},
        ],
      }) as VElementNode[];

      expect(vNode.tagName).toEqual('ul');
      expect(vNode.children.length).toEqual(2);

      expect(vNode.children[0].nodeType).toEqual(NodeType.ElementNode);
      expect((vNode.children[0] as VElementNode).tagName).toEqual('li');
      // @ts-ignore
      expect((vNode.children[0].children[0] as VTextNode).textContent).toEqual('1');

      expect(vNode.children[1].nodeType).toEqual(NodeType.ElementNode);
      expect((vNode.children[1] as VElementNode).tagName).toEqual('li');
      // @ts-ignore
      expect((vNode.children[1].children[0] as VTextNode).textContent).toEqual('2');
    });

    test('rendering empty list', () => {
      const [vNode] = buildVirtualTree(semanticNode, {
        items: [],
      }) as VElementNode[];

      expect(vNode.tagName).toEqual('ul');
      expect(vNode.children.length).toEqual(0);
    });
  })
});