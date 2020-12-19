import VElementNode from '../VNode/VElementNode.js';
import VTextNode from '../VNode/VTextNode.js';
import VComponentNode from '../VNode/VComponentNode.js';
import {ComponentConstructor} from '../../component/index.js';

type TCutTextNodeResult = [
  {node: VTextNode},
  string,
];

type TCutElementNodeResult = [
  {node: VElementNode | VComponentNode, content: string},
  string,
];

const OPEN_TAG_REGEXP = /<([\w-]*).*?>/;

const generateParsingTemplateError = (template: string): Error => {
  return new Error(`Ошибка при парсинге шаблона: ${template}`);
};

export const cutElementNode = (template: string, components: {[key: string]: ComponentConstructor}): TCutElementNodeResult => {
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

  const isComponent = !!components[tagName];
  const node = isComponent 
    ? new VComponentNode(tag, components[tagName])
    : new VElementNode(tag);

  const element = {node, content: tagContent.trim()};
  return [element, _template];
}

export const cutTextNode = (template: string): TCutTextNodeResult => {
  const textRegExp = /[^<]*/;
  const textMatch = textRegExp.exec(template);
  if (!textMatch) {
    throw generateParsingTemplateError(template);
  }
  
  const [text] = textMatch;
  const element = {
    node: new VTextNode(text),
  };

  return [element, template.slice(textMatch.index + text.length)];
};