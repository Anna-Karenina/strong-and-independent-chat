type TEventOptions = Record<string, any>;

export default abstract class Event {
  abstract init(opts: TEventOptions): void;
}