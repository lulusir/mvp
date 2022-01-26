/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { usePresenter } from '@lujs/react-mvp-adaptor';
import { injectable, Model, Presenter } from '..';

interface IViewState {
  loading: boolean;
}
class IndexModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
}

@injectable()
class IndexPresenter extends Presenter<IndexModel> {
  constructor(protected model: IndexModel) {
    super();
  }

  changeLoading = () => {
    this.model.setState((s) => {
      s.loading = !s.loading;
    });
  };
}

const IndexPage = () => {
  // @ts-ignore
  const { presenter, state } = usePresenter<IndexPresenter>(IndexPresenter);
  return (
    <div>
      <p data-testid="p"> {state.loading && 'loading'}</p>
      {/* @ts-ignore */}
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
