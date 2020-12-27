import { get } from '../../utils/index.js';
export const each = (rawStr, ctx) => {
    const [itemName, listName] = rawStr.split('in').map((str) => str.trim());
    const list = get(ctx, listName, []);
    return list.map((item) => ({ ...ctx, [itemName]: item }));
};
//# sourceMappingURL=each.js.map