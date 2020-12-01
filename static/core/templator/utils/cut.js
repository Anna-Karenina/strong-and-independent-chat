import VElementNode from '../VNode/VElementNode.js';
import VTextNode from '../VNode/VTextNode.js';
import VComponentNode from '../VNode/VComponentNode.js';

const OPEN_TAG_REGEXP = /<([\w-]*).*?>/;

export const cutElementNode = (template, components) => {
  const openTag = OPEN_TAG_REGEXP.exec(template);
  const [tag, tagName] = openTag;
  
  template = template.slice(openTag.index + tag.length);
  const beforeCloseTagRegExp = new RegExp(`(.*?)</${tagName}.*?>`);
  const openSimilarTagRegExp = new RegExp(`<${tagName}.*?>`, 'g');
  const closeSimilarTagRegExp = new RegExp(`</${tagName}.*?>`, 'g');

  let tagContent = '';
  let level = 1;
  let key = null;

  while((key = beforeCloseTagRegExp.exec(template))) {
    const [matched, matchedWithoutCloseTag] = key;

    level += (matched.match(openSimilarTagRegExp) || []).length;
    level -= (matched.match(closeSimilarTagRegExp) || []).length;

    template = template.slice(key.index + matched.length);

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

  const element = { node, content: tagContent.trim() };
  return [element, template];
}

export const cutTextNode = (template) => {
  const textRegExp = /[^<]*/;
  const textMatch = textRegExp.exec(template);
  const [ text ] = textMatch;
  const element = {
    node: new VTextNode(text),
  };

  return [ element, template.slice(textMatch.index + text.length) ];
};