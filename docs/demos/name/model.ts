import { Model } from '@lujs/mvp';

interface IViewState {
  loading: boolean;
  name: string;
}

export class NameModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs',
    };
  }
}
