/* eslint-disable no-underscore-dangle */
/* eslint-disable no-dupe-class-members */
import produce, { Immutable, setAutoFreeze } from 'immer';
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
      this._state = s;
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
      const clone = cloneDeep(fn);
      newState = clone as S;
    }

    this._state = newState;
    devtools.send(this.state, this.constructor.name);
  }
}
