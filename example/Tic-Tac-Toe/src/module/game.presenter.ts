import { injectable } from '@lujs/di';
import { Presenter, entry } from '@lujs/mvp';
import { GameModel, ISquares } from './game.model';

@injectable()
export class GamePresenter extends Presenter<GameModel> {
  constructor(private model: GameModel) {
    super();
  }

  fall(i: number) {
    console.log(i, '==i');
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const history = this.model.state.history.slice(
      0,
      this.model.state.stepNumber + 1,
    );
    console.log(history, 'history');
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (this.calculateWinner(squares)) {
      return;
    }

    // 有棋子了
    if (squares[i]) {
      return;
    }

    squares[i] = this.model.state.xIsNext ? 'X' : 'O';

    console.log(squares, 'squares');
    this.model.setState((s) => {
      s.history = history.concat({ squares });
      s.stepNumber = history.length;
      s.xIsNext = !s.xIsNext;
    });
    this.updateView();
  }

  calculateWinner(squares: ISquares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step: number) {
    this.model.setState((s) => {
      s.stepNumber = step;
      s.xIsNext = step % 2 === 0;
    });
    this.updateView();
  }
}
