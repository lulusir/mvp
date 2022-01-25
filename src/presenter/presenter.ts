import { Model } from '../model/model';
import { devtools } from '../utils/devtool';

type ModelType<M> = M extends Model ? M : Model;

export abstract class Presenter<M> {
  protected abstract model: ModelType<M>;

  getState(): ModelType<M>['state'] {
    return this.model.state;
  }

  get state() {
    return this.getState();
  }

  setState: ModelType<M>['setState'] = (data) => this.model.setState(data);

  updateView() {
    throw Error('必须使用useController 绑定controller：');
  }

  __init() {
    const { model } = this;
    devtools.init(model.state, model.constructor.name);
  }

  __destroy() {
    const { model } = this;
    devtools.remove(model.constructor.name);
  }

  __useAutoUpdate() {
    const { model } = this;
    const { unsubscribe } = model.subscribe(() => {
      this.updateView();
    });

    return {
      unsubscribe,
    };
  }
}
