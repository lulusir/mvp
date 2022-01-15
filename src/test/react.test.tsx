/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { usePresenter } from '@lujs/react-mvp-adaptor';
import { injectable, Model, Presenter } from '..';

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
    console.log('click');
    this.model.setState((s) => {
      s.loading = !s.loading;
    });
    this.updateView();
  };
}

const IndexPage = () => {
  const { presenter, state } = usePresenter<IndexPresenter>(IndexPresenter);
  return (
    <div>
      <p data-testid="p"> {state.loading && 'loading'}</p>

      <button data-testid="change" onClick={presenter.changeLoading}>
        change
      </button>
    </div>
  );
};

it('test react render', () => {
  render(<IndexPage />);

  expect(screen.getByTestId('p')).not.toHaveTextContent('loading');
  userEvent.click(screen.getByTestId('change'));
  expect(screen.getByTestId('p')).toHaveTextContent('loading');
});
