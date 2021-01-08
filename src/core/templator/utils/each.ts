import {TCtx} from '../types';
import {get} from '@core/utils';

export const each = (rawStr: string, ctx: TCtx) => {
  const [itemName, listName] = rawStr.split('in').map((str) => str.trim());
  const list = get(ctx, listName, []) as unknown[];

  return list.map((item: unknown) => ({...ctx, [itemName]: item}));
};
