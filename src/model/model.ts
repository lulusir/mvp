/* eslint-disable no-underscore-dangle */
/* eslint-disable no-dupe-class-members */
import produce, { freeze, Immutable, setAutoFreeze } from 'immer';
import cloneDeep from 'clone';
import { devtools } from '../utils/devtool';

setAutoFreeze(true);
interface UpdateFn<S> {
  (state: S): void;
}

export abstract class Model<S = any> {
  private _state!: S;

  get state(): S {
    if (this._state === undefined) {
      throw Error('place defined state');
    }
    return this._state;
  }

  protected set state(s: S) {
    if (this._state === undefined) {
      this._state = freeze(s, true);
    } else {
      throw Error('please use setState');
    }
  }

  setState(fn: UpdateFn<S> | S): void;

  setState(fn: S): void {
    let newState: S;
    if (typeof fn === 'function') {
      newState = produce(this._state, fn as unknown as UpdateFn<S>);
    } else {
      // 如果传入的对象和源对象一样，就不需要更改
      const clone = cloneDeep(fn);
      newState = freeze(clone, true);
      newState = clone;
    }

    this._state = newState;
    devtools.send(this.state, this.constructor.name);
  }
}
