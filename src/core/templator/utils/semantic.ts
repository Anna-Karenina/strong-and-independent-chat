import {TTemplatorComponents, TSemanticNode, TAttrs} from '../types/index.js';
import {getAttrs} from './attrs.js';

type TCutResult = [TSemanticNode, string];

export const TEXT_NODE_TYPE = 'TEXT_NODE';

const OPEN_TAG_REGEXP = /<([\w-]*).*?>/;

const generateParsingTemplateError = (template: string): Error => {
  return new Error(`Ошибка при парсинге шаблона: ${template}`);
};

const createSemanticNode = (
  type: string,
  attrs: TAttrs = {},
  children: TSemanticNode[] = []
): TSemanticNode => ({type, attrs, children});

const cutElement = (template: string, components: TTemplatorComponents): TCutResult => {
  let _template = template;
  const openTag = OPEN_TAG_REGEXP.exec(_template);
  if (!openTag) {
    throw generateParsingTemplateError(_template);
  }
  const [tag, tagName] = openTag;
  
  _template = _template.slice(openTag.index + tag.length);
  const beforeCloseTagRegExp = new RegExp(`(.*?)</${tagName}.*?>`);
  const openSimilarTagRegExp = new RegExp(`<${tagName}.*?>`, 'g');
  const closeSimilarTagRegExp = new RegExp(`</${tagName}.*?>`, 'g');

  let tagContent = '';
  let level = 1;
  let key = null;

  while((key = beforeCloseTagRegExp.exec(_template))) {
    const [matched, matchedWithoutCloseTag] = key;

    level += (matched.match(openSimilarTagRegExp) || []).length;
    level -= (matched.match(closeSimilarTagRegExp) || []).length;

    _template = _template.slice(key.index + matched.length);

    if (level <= 0) {
      tagContent += matchedWithoutCloseTag;
      break;
    }
    tagContent += matched;
  }

  const attrs = getAttrs(tag);
  const children = buildSemanticTree(tagContent, components, false) as TSemanticNode[];
  const node = createSemanticNode(tagName, attrs, children);

  const componentClass = components[tagName];
  if (componentClass) {
    node.attrs.__componentClass = componentClass;
  }

  return [node, _template];
}

const cutTextNode = (template: string): TCutResult => {
  const textRegExp = /[^<]*/;
  const textMatch = textRegExp.exec(template);
  if (!textMatch) {
    throw generateParsingTemplateError(template);
  }
  
  const [textContent] = textMatch;
  const node = createSemanticNode(TEXT_NODE_TYPE, {textContent});

  return [node, template.slice(textMatch.index + textContent.length)];
};

export const buildSemanticTree = (template: string, components: TTemplatorComponents, root = true) => {
    let rowTemplate = template.replace(/[\n\r]/g, '').trim();
    if (!rowTemplate) return [];
  
    const nodes = [];
  
    while(rowTemplate) {
      if (!rowTemplate.startsWith('<')) {
        const [node, restTemplate] = cutTextNode(rowTemplate);
        if (root) {
          return node;
        }
        nodes.push(node);
        rowTemplate = restTemplate.trim();
        continue;
      }
  
      const [node, restTemplate] = cutElement(rowTemplate, components);
      if (root) return node;
      nodes.push(node);

      rowTemplate = restTemplate.trim();
    }
  
    return nodes;
  };