# - SearchService

这是一个搜索的基类会将搜索条件绑定到路由对西那个中 将查询提交通过vue-rx暴露给视图
```js
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

/**
 * 根据路由参数生成searchQuery$
 */
export class
@Injectable()SearchService<T> implements RouteGuard {
  searchQuery$: State<T>
  constructor() {
    this.searchQuery$ = new State({})
  }
  protected SET_SEARCH_QUERY(query: T) {
    this.searchQuery$.commit(() => query)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_SEARCH_QUERY(to.meta.query)
    next()
  }
}
```
1. 使用vue-rxsubscriptions映射到视图服务的搜索条件对象。然后输入框绑定搜索条件对象的其中一个值
  这一步完成搜索条件对路由的meta.query绑定
  ```js
  # searchService对应视图的服务
  <a-input v-model='searchQuery.a'></a-input>
  subscriptions() {
    return {
      searchQuery: this.searchService.searchQuery$
    }
  }
  ```
