import Component, {IProps, IState} from './Component';

interface ComponentConstructor {
  new (props: IProps): Component;
};

export default Component;

export {
  IProps,
  IState,
  ComponentConstructor,
};