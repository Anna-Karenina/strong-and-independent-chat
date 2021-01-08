import {TCtx} from '../types/index';
import {get} from '../../utils/index';

export const each = (rawStr: string, ctx: TCtx) => {
  const [itemName, listName] = rawStr.split('in').map((str) => str.trim());
  const list = get(ctx, listName, []);

  return list.map((item: unknown) => ({...ctx, [itemName]: item}));
};
