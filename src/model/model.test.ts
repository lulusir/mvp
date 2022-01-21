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

  it('Only use the setState method to modify state deep', () => {
    const m = new M();

    const fn = () => {
      // @ts-ignore：错误执行
      m.state.a = {};
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, when setState pass obj', () => {
    const m = new M();
    m.setState(makeState());

    const fn = () => {
      // @ts-ignore：错误执行
      m.state = {};
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, when setState pass obj, deep', () => {
    const m = new M();
    m.setState(makeState());

    const fn = () => {
      // @ts-ignore：错误执行
      m.state.a = {};
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, when setState pass function', () => {
    const m = new M();
    m.setState((s) => {
      s = makeState();
    });

    const fn = () => {
      // @ts-ignore：错误执行
      m.state = {};
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, when setState pass function, deep', () => {
    const m = new M();
    m.setState((s) => {
      s = makeState();
    });

    const fn = () => {
      // @ts-ignore：错误执行
      m.state.a = {};
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

  it('change old state will throw error', () => {
    const fn = () => {
      const m = new M();
      const oldS = m.state;
      const o1 = makeState();

      m.setState(o1);

      // change old state will throw error
      o1.a.b.c = [];
    };
    expect(fn).toThrow();
  });

  it('Only use the setState method to modify state, with function', () => {
    const m = new M();
    const oldS = m.state;
    m.setState((s) => {
      // eslint-disable-next-line no-param-reassign
      s.a.b.c = [1];
    });

    expect(oldS).not.toBe(m.state);
    expect(m.state.a.b.c).toEqual([1]);
    expect(m.setState).toBeDefined();
  });

  it('Only use the setState method to modify state, with function', () => {
    const m = new M();
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

  it('subscribe, triggered when state is modified', (done) => {
    const m = new M();
    let count = 0;
    m.subscribe((state) => {
      count += 1;
    });
    setTimeout(() => {
      expect(count).toBe(0);
      done();
    }, 0);
  });

  it('subscribe, triggered when state is modified 1', (done) => {
    const m = new M();
    let count = 0;
    m.subscribe((state) => {
      console.log(state, '==state');
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });
    m.setState((s) => {
      s.a.b.c = [];
    });
    setTimeout(() => {
      expect(count).toBe(1);
      done();
    }, 0);
  });

  it('subscribe, triggered when state is modified 2', (done) => {
    const m = new M();
    let count = 0;
    m.subscribe((state) => {
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });
    m.subscribe((state) => {
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });

    m.setState((s) => {
      s.a.b.c = [];
    });

    setTimeout(() => {
      expect(count).toBe(2);
      done();
    }, 0);
  });
  it('unsubscribe', (done) => {
    const m = new M();
    let count = 0;
    const s = m.subscribe((state) => {
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });
    s.unsubscribe();

    m.subscribe((state) => {
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });

    m.setState((s) => {
      s.a.b.c = [];
    });

    setTimeout(() => {
      expect(count).toBe(1);
      done();
    }, 0);
  });

  it('unsubscribe', (done) => {
    const m = new M();
    let count = 0;
    const s = m.subscribe((state) => {
      count += 1;
      expect(state.a.b.c).toEqual([]);
    });

    m.setState((s) => {
      s.a.b.c = [];
    });

    setTimeout(() => {
      expect(count).toBe(1);

      m.setState((s) => {
        s.a.b.c = [];
      });
      expect(count).toBe(2);

      s.unsubscribe();
      m.setState((s) => {
        s.a.b.c = [];
      });
      expect(count).toBe(2);

      done();
    }, 0);
  });
});
