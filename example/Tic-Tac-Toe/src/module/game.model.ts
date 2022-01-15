import { Model } from '@lujs/mvp';

export type ISquares = (null | string)[];

type IViewState = {
  history: { squares: ISquares }[];
  stepNumber: number;
  xIsNext: boolean;
};

export class GameModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
}
