import { Model, injectable, Presenter } from '..';
import { PresenterFactor } from './factor';

class IndexModel extends Model<{ loading: boolean }> {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
}

@injectable()
class IndexPresenter extends Presenter<IndexModel> {
  constructor(private model: IndexModel) {
    super();
  }

  changeLoading = () => {
    this.model.setState((s) => {
      s.loading = !s.loading;
    });
  };
}

describe('factor', () => {
  it('get', () => {
    const p = PresenterFactor.get<IndexPresenter>(IndexPresenter);

    expect(p).toBeInstanceOf(IndexPresenter);
    expect(p.getState().loading).toBe(false);
    expect(p.changeLoading).toBeDefined();
    expect(p.updateView).toBeDefined();
  });

  it('get different obj', () => {
    const p1 = PresenterFactor.get<IndexPresenter>(IndexPresenter);
    const p2 = PresenterFactor.get<IndexPresenter>(IndexPresenter);

    expect(p1).not.toBe(p2);

    p1.changeLoading();
    expect(p1.getState().loading).toBeTruthy();
    expect(p2.getState().loading).toBeFalsy();
  });
});
