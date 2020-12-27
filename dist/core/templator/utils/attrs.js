import { get } from '../../utils/index.js';
const ATTRIBUTES_REGEXP = /(\S*?)="(.*?)"/;
const skipAttribute = (attrName) => {
    const excludesPrefixes = ['@', '__', '$'];
    return excludesPrefixes.some((prefix) => attrName.startsWith(prefix));
};
export const getAttrs = (tag) => {
    const attrs = {};
    let key = null;
    while ((key = ATTRIBUTES_REGEXP.exec(tag))) {
        const [match, name, value] = key;
        tag = tag.slice(key.index + match.length);
        attrs[name] = value;
    }
    return attrs;
};
export const pickServiceAttrs = (attrs) => {
    return Object
        .keys(attrs)
        .filter((attr) => attr.startsWith('$'))
        .reduce((acc, attr) => ({ ...acc, [attr.slice(1)]: attrs[attr] }), {});
};
export const parseAttributes = (attrs, ctx) => {
    const parsedAttrs = {};
    const attrsEntries = Object.entries(attrs);
    for (let [key, value] of attrsEntries) {
        if (skipAttribute(key)) {
            continue;
        }
        if (key.startsWith(':')) {
            const attrValue = get(ctx, String(value), null);
            parsedAttrs[key.slice(1)] = attrValue;
        }
        else {
            parsedAttrs[key] = String(value);
        }
    }
    return parsedAttrs;
};
export const parseListeners = (attrs, ctx) => {
    const parsedLesteners = {};
    const attrsEntries = Object.entries(attrs);
    for (let [key, value] of attrsEntries) {
        if (!key.startsWith('@')) {
            continue;
        }
        parsedLesteners[key.slice(1)] = get(ctx, String(value), () => { });
    }
    return parsedLesteners;
};
//# sourceMappingURL=attrs.js.map