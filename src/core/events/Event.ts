export default abstract class Event<T> {
  abstract init(opts: T): void;
}