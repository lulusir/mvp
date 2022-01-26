/* eslint-disable no-underscore-dangle */
/* eslint-disable no-dupe-class-members */
import produce, { freeze, Immutable, setAutoFreeze } from 'immer';
// import cloneDeep from 'clone';
import EventEmitter from 'eventemitter3';
import { devtools } from '../utils/devtool';

setAutoFreeze(true);

interface UpdateFn<S> {
  (state: S): void;
}

const ModelAction = {
  modelChange: 'modelChange',
};
export abstract class Model<S = any> {
  private _state!: S;

  private __emitter = new EventEmitter();

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
      newState = freeze(fn, true);
    }

    this._state = newState;

    devtools.send(this._state, this.constructor.name);

    this.__emitter.emit(ModelAction.modelChange, this._state);
  }

  /**
   * 通知状态更新
   * @param callback
   * @returns
   */
  subscribe(callback: (state: S) => void) {
    this.__emitter.on(ModelAction.modelChange, callback);
    return {
      unsubscribe: () => {
        this.__emitter.off(ModelAction.modelChange, callback);
      },
    };
  }
}
