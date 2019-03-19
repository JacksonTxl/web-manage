# Router 路由

## 1. 注入服务
  视图需要的初始化数据都是需要调用后端服务，我们框架采取通过路由绑定所需要的服务，当路由跳转到相应的视图，就会掉用相应的服务
  1. 在视图的同级目录下写一个与视图同名的ts文件服务
  ![同名服务](https://static-s.styd.cn/201903191611/zhuru.png)
  自动生成路由的时候就会把服务放到路由对象中的guards
  ```js
    {
      name: 'test-zlx',
      path: '/test/zlx',
      component: pageTestZlx,
      guards: [TestZlxService]
    },
  ```
  2. 利用vue-router的周期钩子实现声明的服务类
  - beforeEach
  - beforeRouteEnter
  - beforeRouteUpdate
  - afterEach
  ```js
  # zlx.service.ts
  import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'

  @Injectable()
  export class DashboardService implements RouteGuard {
    constructor() {}
    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('zlx service 全局前置置钩子')
      next()
    }
    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('zlx service 路由开始进入前 start')
      next()
    }
    beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('zlx service 路由更新前 start')
      next()
    }
    afterEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('zlx service 全局后置钩子')
    }
  }
  ```
## 2. 路由绑定query
当时遇到问题，为了粘贴链接访问的信息一致。将搜索查询的数据绑定到路由上，这样就可以使用路由上的信息进行搜索初始化搜索条件，查询信息一致。
### 搜索基类
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
**1. 完成搜索条件对路由的meta.query绑定**

使用vue-rxsubscriptions映射到视图服务的搜索条件对象。然后输入框绑定搜索条件对象的其中一个值

  ```js
  # searchService对应视图的服务
  <a-input v-model='searchQuery.a'></a-input>
  subscriptions() {
    return {
      searchQuery: this.searchService.searchQuery$
    }
  }
  ```
2