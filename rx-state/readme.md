## rx-state

及简单的基于 rx 的 state 管理方案

```js
import { State, getSnapshot } from 'rx-state'

// 初始化一个流 第一参为值 第二个参为标签名称
const count$ = new State(0, 'a')

const ADD = state => state + 1
const MINUS = state => state - 1

// 通过commit改变流中的值
a$.commit(ADD)
a$.commit(ADD)
a$.commit(MINUS)

a$.subscribe(v => {
  console.log(v) // 1
})

// 获取流状态的当前值
getSnapshot(a$) // 1
```

## rxjs 与 ts 结合 复杂一点的状态

```ts
import { State } from 'rx-state'
import { pluck } from 'rxjs/operators'
interface User {
  name: string
  age: number
}
interface UserState {
  user: User
  menu: string[]
}
const initialState = {
  user: {},
  menu: []
}

const userState$ = new State(initialState, 'userState')

// 可以直接进行pipe操作来定义user流
const user$ = userState$.pipe(
  pluck('user'),
  filter(user => user.name)
)
// 菜单流
const menu$ = userState$.pipe(pluck('menu'))

// 更新 user 这个会生效
userState$.commit(state => {
  state.user = {
    name: 'hello',
    age: 38
  }
})

// 这个state$会发射 但user$不会发射 因为上面定义了filter()
userState$.commit(state => {
  state.user = {
    name: '',
    age: 38
  }
})

```

```js
const reload$ = new Action(data$ => {
  data$.pipe(
    debounceTime(1000),
    // 捕获子流的错误 错误冒泡会导致父流中断
    switchMap(() =>
      ajax.get('/release.json?123').pipe(catchError(() => EMPTY))
    ),
    tap(res => {
      console.log('延迟更新成功', res)
    })
  )
})

// 派发事件 注意该事件流本身一般是高阶流 要捕获子流的错误
reload$.dispatch()
```
