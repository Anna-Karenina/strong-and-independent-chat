type TServiceOptions = Record<string, any>;

export default abstract class Service {
  abstract connect(opts: TServiceOptions): void;
}