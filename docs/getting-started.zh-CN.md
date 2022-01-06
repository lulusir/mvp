---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## install

```
npm install @lujs/mvp @lujs/react-mvp-adaptor --save-dev
```

or

```
yarn add @lujs/mvp @lujs/react-mvp-adaptor
```

## Model

```typescript
import { Model } from '@lujs/mvp';

interface IViewState {
  loading: boolean;
  name: string
}

export class NameModel extends Model<IViewState> {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: 'lujs'
    }
}

```

## Presenter

```typescript
import { Presenter, injectable } from '@lujs/mvp';
@injectable()
export class NamePresenter extends Presenter<NameModel> {
  constructor(private readonly model: OrderModel) {
    super();
  }

  changeName() {
    this.model.setState('aha'); // api of set model state
    this.updateView(); // api of update view
  }
}
```

## View

```typescript | pure
const Name = () => {
  const { presenter, state } = usePresenter<NamePresenter>(NamePresenter);
  return (
    <div>
      name: {state.name}
      <button onClick={presenter.changeName()}>change name</button>
    </div>
  );
};

export default Name;
```
