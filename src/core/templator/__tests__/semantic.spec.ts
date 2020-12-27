import Component, {IProps} from '../../component/index.js';
import Templator from '../Templator.js';
import {TSemanticNode} from '../types/index.js';
import {buildSemanticTree, TEXT_NODE_TYPE} from '../utils/semantic.js';

const simpleTemplator = Templator.compile('<div>I am a simple!</div>');

class SimpleComponent extends Component {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return simpleTemplator({});
  }
}

describe('Templator: semantic', () => {
  describe('Semantic nodes', () => {
    test('text node parsing', () => {
      const text = 'I am text node';
      const node = buildSemanticTree(text, {}) as TSemanticNode;

      expect(node.type).toEqual(TEXT_NODE_TYPE);
      expect(node.attrs.textContent).toEqual(text);
    });

    test('element node parsing', () => {
      const node = buildSemanticTree('<div></div>', {}) as TSemanticNode;

      expect(node.type).toEqual('div');
    });

    test('component node parsing', () => {
      const node = buildSemanticTree('<simple-component />', {
        'simple-component': SimpleComponent,
      }) as TSemanticNode;

      expect(node.type).toEqual('simple-component');
      expect(node.attrs.__componentClass).toEqual(SimpleComponent);
    });
  })

  describe('Semantic attrs', () => {
    test('common attrs parsing correctly', () => {
      const input = '<input type="text" class="input" data-target="input">'
      const node = buildSemanticTree(input, {}) as TSemanticNode;

      expect(node.attrs['type']).toEqual('text');
      expect(node.attrs['class']).toEqual('input');
      expect(node.attrs['data-target']).toEqual('input');
    });

    test('special attrs parsing correctly', () => {
      const input = '<input $each="field in fields" :value="field.value" @input="field.onInput">'
      const node = buildSemanticTree(input, {}) as TSemanticNode;

      expect(node.attrs['$each']).toEqual('field in fields');
      expect(node.attrs[':value']).toEqual('field.value');
      expect(node.attrs['@input']).toEqual('field.onInput');
    });

    test('skip wrong attrs', () => {
      const div = '<div single wrong=value notOpen=asd" notClose="asd></div>'
      const node = buildSemanticTree(div, {}) as TSemanticNode;

      expect(node.attrs['single']).not.toBeDefined();
      expect(node.attrs['wrong']).not.toBeDefined();
      expect(node.attrs['notOpen']).not.toBeDefined();
      expect(node.attrs['notClose']).not.toBeDefined();
    });
  })

  describe('Semantic nesting', () => {
    test('different nodes', () => {
      const template = `
        <div>
          <span>Text</span>
          <input>
          <br>
          <component />
        </div>
      `;

      const node = buildSemanticTree(template, {component: SimpleComponent}) as TSemanticNode;
      expect(node.type).toEqual('div');
      expect(node.children.length).toEqual(4);

      expect(node.children[0].type).toEqual('span');
      expect(node.children[0].children.length).toEqual(1);
      expect(node.children[0].children[0].type).toEqual(TEXT_NODE_TYPE);
      expect(node.children[0].children[0].attrs.textContent).toEqual('Text');

      expect(node.children[1].type).toEqual('input');

      expect(node.children[2].type).toEqual('br');

      expect(node.children[3].type).toEqual('component');
      expect(node.children[3].attrs.__componentClass).toEqual(SimpleComponent);
    });

    test('similar nodes', () => {
      const template = `
        <div class="div1">
          <div class="div2">
            <div class="div3">
              Text
            </div>
          </div>
        </div>
      `;

      const node = buildSemanticTree(template, {}) as TSemanticNode;

      expect(node.type).toEqual('div');
      expect(node.attrs.class).toEqual('div1');

      expect(node.children[0].type).toEqual('div');
      expect(node.children[0].attrs.class).toEqual('div2');

      expect(node.children[0].children[0].type).toEqual('div');
      expect(node.children[0].children[0].attrs.class).toEqual('div3');

      expect(node.children[0].children[0].children[0].type).toEqual(TEXT_NODE_TYPE);
      expect(node.children[0].children[0].children[0].attrs.textContent).toEqual('Text');
    });
  })
});