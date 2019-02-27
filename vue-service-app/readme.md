## vue-service-app

使用服务管理全局 vue 应用的数据流

依赖于
* vue-router
* vue-router-multiguard

```js
import VueServiceApp, { Router, Service } from 'vue-service-app'

Vue.use(VueServiceApp)

class TestService extends Service {
  beforeEach(to, from, next) {
    console.log('不论是路由进入前和路由更新都会触发的钩子')
    next()
  }
  // 路由进入前钩子
  beforeRouteEnter(to, from, next) {
    console.log(to.meta.query) // 格式化后的query
    console.log('路由进入前钩子')
    next()
  }
  beforeRouteUpdate(to, from, next) {
    console.log('路由更新时钩子')
    next()
  }
  afterEach(to, from) {
    console.log('路由结束时的钩子')
  }
}

/**
 * 导出的router为vue-router实例
 */
const { router } = new Router({
  base: '/',
  routes: [
    {
      name: 'a',
      path: '/',
      // 扩展了guards选项
      guards: [],
      // 扩展了query处理选项
      queryOptions: {
        a: { type: Number, default: 99 },
        b: { type: String, default: '999' }
      }
    }
  ]
})

new Vue({
  // ...
  router
  // ...
})
```
