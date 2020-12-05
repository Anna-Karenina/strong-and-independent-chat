import Component, { IProps } from './Component.js';

interface ComponentConstructor {
  new (props: IProps): Component;
};

export default Component;

export {
  IProps,
  ComponentConstructor,
};