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
**还给路由扩展一个queryOptions字段**
```js
# 路由对象
    {
      name: 'test-zlx'
      path: '/test/zlx',
      component: pageTestZlx,
      guards: [TestZlxService],
      queryOptions: {
        a: { type: Number },
        b: { type: String, default: '3333'}
      }
    },
# xxx.vue
computed: {
  query() {
    # 这样可以拿到queryOptions字段
    this.$router.meta.query
  }
}
```
queryOptions

type: 对字段类型进行校验 必填
default: 初始化字段 选填
