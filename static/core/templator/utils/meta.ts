const TAG_NAME_REGEXP = /(?<=<)\w*/;
const ATTRIBUTES_REGEXP = /(\S*?)="(.*?)"/;

export interface IMetaAttribute {
  name: string,
  value: string,
};

export interface IMetaListener {
  event: string,
  handlerName: string,
};

interface ITagMeta {
  attributes: IMetaAttribute[],
  listeners: IMetaListener[],
  className: string,
  tagName: string,
};

export const getTagName = (tag: string): string => {
  const match = TAG_NAME_REGEXP.exec(tag);

  return match && match[0] || '';
};

export const getAllAttributesFromTag = (tag: string): IMetaAttribute[] => {
  const attrs = [];
  let key = null;

  while ((key = ATTRIBUTES_REGEXP.exec(tag))) {
    const [match, name, value] = key;
    tag = tag.slice(key.index + match.length);
    attrs.push({ name, value });
  }

  return attrs;
};

export const getTagMeta = (tag: string): ITagMeta => {
  const tagName = getTagName(tag);
  const allAttrs = getAllAttributesFromTag(tag);

  const meta = allAttrs.reduce((acc: ITagMeta, attr) => {
    const { name, value } = attr;
    if (name === 'class') {
      acc.className = value;
      return acc;
    }
    if (name.startsWith('@')) {
      acc.listeners.push({ event: name.slice(1), handlerName: value });
      return acc;
    }

    acc.attributes.push(attr);
    return acc;
  }, { attributes: [], listeners: [], className: '', tagName });

  return meta;
};
