## rx-state

及简单的基于 rx 的 state 管理方案

```js
import { State, getState } from 'rx-state'

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
getState(a$) // 1
```

## rxjs 实现计算状态流

```js
import { combineLastest } from 'rxjs'

const todos$ = new State([])
const count$ = new State(0)

const state$ = combineLastest(todos$, count$, (todos, count) => ({
  todos,
  count
}))
state$.subscribe(v => {
  console.log(v) // {todos:[],count:0}
})

// 一样可以通过getState获取当前值
getState(state$) // {todos:[],count:0}

// 对象型的状态是immutable的 可以直接操作
todos$.commit(todos => {
  todos.push({ id: 1, title: '3' })
})

getState(state$) // {todos:[{id:1,title:'3'}],count:0}
```

```js
const reload$ = new Action(data$ => {
  data$.pipe(
    debounceTime(1000),
    // 捕获子流的错误 错误冒泡会导致父流中断
    switchMap(() =>
      ajax.get('/release.json?123').pipe(catchError(() => EMPTY))
    ),
    tap(_ => {
      console.log('延迟更新成功')
    })
  )
})

// 派发事件 注意该事件流本身一般是高阶流 要捕获子流的错误
reload$.dispatch()
```
