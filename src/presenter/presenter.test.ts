/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { Model } from '../model/model';
import { Presenter } from './presenter';
import { devtools } from '../utils/devtool';

jest.mock('../utils/devtool');

devtools.init = jest.fn((state: any, name: string) => ({
  state,
  name,
}));

devtools.remove = jest.fn((name: string) => ({
  name,
}));
type MockInit = jest.Mock<
  {
    state: any;
    name: string;
  },
  [state: any, name: string]
>;

type MockRemove = jest.Mock<
  {
    name: string;
  },
  [name: string]
>;
interface IViewState {
  a: {
    b: {
      c: number[];
    };
  };
}
class M extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      a: {
        b: {
          c: [1, 2, 3],
        },
      },
    };
  }
}

class TestP extends Presenter<M> {
  constructor(private model: M) {
    super();
  }
}

describe('Presenter', () => {
  it('init', () => {
    const m = new M();
    const p = new TestP(m);
    expect(p.getState()).toBe(m.state);
    expect(p.updateView).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('state', () => {
    const m = new M();
    const p = new TestP(m);
    expect(p.getState()).toBe(m.state);
    expect(p.state).toBe(m.state);
    expect(p.updateView).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('set state, fn', () => {
    const m = new M();
    const p = new TestP(m);

    p.setState((s) => {
      s.a.b.c.push(4);
    });
    expect(p.state.a.b.c).toEqual([1, 2, 3, 4]);
    expect(p.getState()).toBe(m.state);
    expect(p.state).toBe(m.state);
    expect(p.updateView).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('set state', () => {
    const m = new M();
    const p = new TestP(m);

    p.setState({
      a: {
        b: {
          c: [1, 2, 3, 4],
        },
      },
    });
    expect(p.state.a.b.c).toEqual([1, 2, 3, 4]);
    expect(p.getState()).toBe(m.state);
    expect(p.state).toBe(m.state);
    expect(p.updateView).toBeDefined();
    expect(p.__init).toBeDefined();
    expect(p.__destroy).toBeDefined();
  });

  it('updateView', () => {
    const m = new M();
    const p = new TestP(m);
    expect(p.updateView).toThrowError();
  });

  it('__useAutoUpdate', () => {
    const m = new M();
    const p = new TestP(m);
    let count = 0;
    p.updateView = () => {
      count += 1;
    };
    p.__useAutoUpdate();

    m.setState((s) => {
      s.a.b.c.push(1);
    });

    expect(count).toBe(1);
  });

  it('__useAutoUpdate, then updateVIew', () => {
    const m = new M();
    const p = new TestP(m);
    let count = 0;
    p.updateView = () => {
      count += 1;
    };
    p.__useAutoUpdate();

    m.setState((s) => {
      s.a.b.c.push(1);
    });
    expect(count).toBe(1);
    p.updateView();

    expect(count).toBe(2);
  });

  it('__init', () => {
    const m = new M();
    const p = new TestP(m);
    p.__init();

    expect(devtools.init).toBeCalled();
    expect((devtools.init as MockInit).mock.calls[0][0]).toBe(m.state);
    expect((devtools.init as MockInit).mock.calls[0][1]).toBe(M.name);
  });
  it('__destroy', () => {
    const m = new M();
    const p = new TestP(m);
    p.__destroy();

    expect(devtools.remove).toBeCalled();
    expect((devtools.remove as MockRemove).mock.calls[0][0]).toBe(M.name);
  });
});
