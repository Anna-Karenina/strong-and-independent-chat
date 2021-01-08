export default abstract class Service<T> {
  abstract connect(opts: T): void;
}