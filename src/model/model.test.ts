/* eslint-disable max-classes-per-file */
import { Model } from './model';

interface IViewState {
  a: {
    b: {
      c: number[];
    };
  };
}
const makeState = () => ({
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
});
class M extends Model<IViewState> {
  constructor() {
    super();
    this.state = makeState();
  }
}

describe('Test model', () => {
  it('default model', () => {
    const m = new M();
    expect(m.state.a.b.c).toEqual([1, 2, 3]);
    expect(m.setState).toBeDefined();
  });

  it('Only use the setState method to modify state', () => {
    const m = new M();

    const fn = () => {
      // @ts-ignore：错误执行
      m.state = {};
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, with obj 1', () => {
    const m = new M();
    const oldS = m.state;
    const o1 = makeState();

    m.setState(o1);

    expect(m.state).not.toBe(oldS);
    expect(m.state.a.b.c).toEqual([1, 2, 3]);
    expect(m.setState).toBeDefined();
  });

  it('Only use the setState method to modify state, with obj 2', () => {
    const m = new M();
    const oldS = m.state;
    const o1 = makeState();

    m.setState(o1);
    o1.a.b.c = [];

    expect(m.state).not.toBe(o1);
    expect(m.state.a.b.c).toEqual([1, 2, 3]);
    expect(m.setState).toBeDefined();
  });
  it('Only use the setState method to modify state, with obj 3', () => {
    const m = new M();
    const oldS = m.state;
    const o1 = makeState();
    o1.a.b.c = [];
    m.setState(o1);

    expect(m.state).not.toBe(o1);
    expect(m.state.a.b.c).toEqual([]);
    expect(m.setState).toBeDefined();
  });

  it('Only use the setState method to modify state, with function', () => {
    const m = new M();
    const oldS = m.state;
    m.setState((s) => {
      // eslint-disable-next-line no-param-reassign
      s.a.b.c = [1, 2, 3];
    });

    expect(oldS).not.toBe(m.state);
    expect(m.state.a.b.c).toEqual([1, 2, 3]);
    expect(m.setState).toBeDefined();
  });
  it('Only use the setState method to modify state, with function', () => {
    const m = new M();
    const oldS = m.state;
    m.setState((s) => {
      // eslint-disable-next-line no-param-reassign
      s.a.b.c = [1, 2, 3, 4];
    });

    expect(m.state.a.b.c).toEqual([1, 2, 3, 4]);
    expect(m.setState).toBeDefined();
  });

  it('string state', () => {
    class M1 extends Model<string> {
      constructor() {
        super();
        this.state = 'test';
      }
    }
    const m = new M1();

    m.setState('xxx');
    expect(m.state).toBe('xxx');
  });

  it('get state before init, will throw error', () => {
    class M1 extends Model<any> {
      constructor() {
        super();
        // get before set
        const a = this.state;
      }
    }

    expect(() => {
      const m = new M1();
    }).toThrowError();
  });
});
