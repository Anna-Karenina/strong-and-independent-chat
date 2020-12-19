import {TAttrs} from '../types/index.js';

const ATTRIBUTES_REGEXP = /(\S*?)="(.*?)"/;

export const getAttrs = (tag: string): TAttrs => {
  const attrs: TAttrs = {};
  let key = null;

  while ((key = ATTRIBUTES_REGEXP.exec(tag))) {
    const [match, name, value] = key;
    tag = tag.slice(key.index + match.length);
    attrs[name] = value;
  }

  return attrs;
};
