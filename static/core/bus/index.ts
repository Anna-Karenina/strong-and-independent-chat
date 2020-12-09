import EventBus, {IListeners, IEventBus} from './EventBus.js';

export default EventBus;
export const bus = new EventBus();

export {
  IListeners,
  IEventBus,
};