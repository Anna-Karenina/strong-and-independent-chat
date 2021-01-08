import Component from '../Component';
import Templator from '../../templator/index';
import {renderComponent} from '../../templator/utils/render';

interface ICounterProps {
  title: string,
};

interface ICounterState {
  count: number,
};

interface ICreateCounterProps {
  componentDidMount?: Function,
  componentDidUpdate?: Function,
  beforeDestroy?: Function,
  props: ICounterProps,
}

const templator = Templator.compile(`
  <div>
    <h1>{{ title }}</h1>
    
    <div>{{ count }}</div>
  </div>
`);

class Counter extends Component<ICounterProps, ICounterState> {
  constructor(props: ICounterProps) {
    super(props);

    this.state = {count: 0};
  }

  render() {
    return templator({
      title: this.props.title,
      count: this.state.count,
    });
  }
}

const createCounter = (opts: ICreateCounterProps) => {
  const {
    componentDidMount = () => {},
    componentDidUpdate = () => {},
    beforeDestroy = () => {},
    props,
  } = opts;

  //@ts-ignore
  Counter.prototype.componentDidMount = componentDidMount;
  //@ts-ignore
  Counter.prototype.componentDidUpdate = componentDidUpdate;
  //@ts-ignore
  Counter.prototype.beforeDestroy = beforeDestroy;

  const counter = new Counter(props);
  renderComponent(counter as any);

  return counter;
}

describe('Component', () => {
  test('component execute CDM after mounting', () => {
    const componentDidMount = jest.fn();
    createCounter({
      props: {title: 'Title'},
      componentDidMount,
    });

    expect(componentDidMount).toHaveBeenCalledTimes(1);
  });

  test('component execute CDU after props changing', () => {
    const componentDidUpdate = jest.fn();
    const counter = createCounter({
      props: {title: 'Title'},
      componentDidUpdate,
    });
    
    counter.setProps({title: 'new Title'})
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('component not execute CDU if new props is equal old props', () => {
    const componentDidUpdate = jest.fn();
    const counter = createCounter({
      props: {title: 'Title'},
      componentDidUpdate,
    });

    counter.setProps({title: 'Title'})
    expect(componentDidUpdate).toHaveBeenCalledTimes(0);
  });

  test('component execute CDU after state changing', () => {
    const componentDidUpdate = jest.fn();
    const counter = createCounter({
      props: {title: 'Title'},
      componentDidUpdate,
    });
    
    counter.setState({count: 1})
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('component not execute CDU if new state is equal old state', () => {
    const componentDidUpdate = jest.fn();
    const counter = createCounter({
      props: {title: 'Title'},
      componentDidUpdate,
    });

    counter.setState({count: 0});
    expect(componentDidUpdate).toHaveBeenCalledTimes(0);
  });

  test('component execute BD during destroy', () => {
    const beforeDestroy = jest.fn();
    const counter = createCounter({
      props: {title: 'Title'},
      beforeDestroy,
    });

    counter.destroy();
    expect(beforeDestroy).toHaveBeenCalledTimes(1);
  });
});