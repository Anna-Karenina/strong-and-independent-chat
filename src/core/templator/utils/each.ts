import {TCtx} from '../types/index.js';
import {get} from '../../utils/index.js';

export const each = (rawStr: string, ctx: TCtx) => {
  const [itemName, listName] = rawStr.split('in').map((str) => str.trim());
  const list = get(ctx, listName, []);

  return list.map((item: unknown) => ({...ctx, [itemName]: item}));
};
