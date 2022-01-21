import { Model } from '../model/model';
import { devtools } from '../utils/devtool';

type P<M> = M extends Model ? M : Model;

export abstract class Presenter<M> {
  getState(): P<M>['state'] {
    const model = Reflect.get(this, 'model');
    return model.state;
  }

  get state() {
    return this.getState();
  }

  updateView() {
    throw Error('必须使用useController 绑定controller：');
  }

  __init() {
    const model: P<M> = Reflect.get(this, 'model');
    devtools.init(model.state, model.constructor.name);
  }

  __destroy() {
    const model: P<M> = Reflect.get(this, 'model');
    devtools.remove(model.constructor.name);
  }

  __useAutoUpdate() {
    const model: P<M> = Reflect.get(this, 'model');
    model.subscribe(() => {
      this.updateView();
    });
  }
}
