---
nav:
  title: API
  path: /api
  order: 3
---

# View adaptor

> 提供 Presenter 给到 View

## react

### usePresenter

- 使用 usePresenter hook
- 注入 Presenter 类
- 获取 presenter 实例, state 对象（model 中声明的 state）
- 在 presenter 使用 updateView 方法可以更新视图

```typescript | pure
import { usePresenter } from '@lujs/react-mvp-adaptor';

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

## if use vue

期待中。。。
