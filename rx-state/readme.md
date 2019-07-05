## rx-state

及简单的基于 rx 的 state 管理方案

```js
import { State } from 'rx-state'

// 初始化一个流 第一参为initial值
const count$ = new State(0)

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
a.snapshot() // 1
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

const userState$ = new State<UserState>(initialState)

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

## Effect 装饰器

使用 effect 装饰器 会在当前类中默认改变 loading\$流的状态 用于表明该请求或异步任务的结束与否

```ts
class TestService {
  loading$ = new State({})
  @Effect()
  hello() {
    return of('hello').pipe(delay(1000))
  }
}

const test = new TestService()

test.loading$.subscribe(loadingState => {
  console.log(loadingStatus)
}
test.hello().subscribe()
```

## 状态追踪

rx-state 并不是单一 store 的范式，并且由于使用了 rxjs，所以表示在状态 pipe 的每一个阶段状态都会变化，所以提供 log 操作符用于打印当前流的状态值

```js
import { log } from 'rx-state'
const a$ = new State({
  user: 'name',
  age: 20
})

const b$ = new Computed(
  a$.pipe(
    pluck('name'),
    log('name') // 此处打印
  )
)
```
