---
nav:
  title: API
  path: /api
  order: 1
---

# Presenter

> 提供方法和 Model 给到 View

## usage

- 注入 model 类
- 使用 updateView 通知视图更新
- 使用 getState 可以获取 model.state

```typescript
import { Presenter, injectable } from '@lujs/mvp';

@injectable()
export class NamePresenter extends Presenter<NameModel> {
  constructor(private readonly model: NameModel) {
    super();
  }

  changeName() {
    this.model.setState('aha'); // api of set model state
    this.updateView(); // api of update view
  }
}
```

## Method

| 参数       | 说明                  | 类型                | 默认值 |
| ---------- | --------------------- | ------------------- | ------ |
| getState   | 返回 model 中的 state | () : Model['state'] |        |
| updateView | 更新 view 的方法      | () : void           |        |
