import VElementNode from '../VNode/VElementNode.js';
import VTextNode from '../VNode/VTextNode.js';

const OPEN_TAG_REGEXP = /<(\w*).*?>/;

export const cutElementNode = (template) => {
  const openTag = OPEN_TAG_REGEXP.exec(template);
  const [tag, tagName] = openTag;
  
  template = template.slice(openTag.index + tag.length);
  const beforeCloseTagRegExp = new RegExp(`(.*?)</${tagName}.*?>`);
  const openSimilarTagRegExp = new RegExp(`<${tagName}.*?>`);

  let tagContent = '';
  let key = null;

  while((key = beforeCloseTagRegExp.exec(template))) {
    const [match, matchWithoutCloseTag] = key;
    const hasSimilarTag = openSimilarTagRegExp.test(match);

    template = template.slice(key.index + match.length);

    if (!hasSimilarTag) {
      tagContent += matchWithoutCloseTag;
      break;
    }
    tagContent += match;
  }

  const element = {
    node: new VElementNode(tag),
    content: tagContent.trim(),
  };

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