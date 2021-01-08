import EventBus, {IListeners, IEventBus} from './EventBus';

export default EventBus;
export const bus = new EventBus();

export {
  IListeners,
  IEventBus,
};