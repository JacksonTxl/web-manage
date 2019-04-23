# Router 路由

router 是基于vue-router进行依赖注入服务 和 url query的扩展
## 特性
- 自动生成路由
- 根据路由自动注入服务
- 视图title的国际化
- 可以灵活的选择视图的layout
- 将页面的query字段配置到url上
## 配置项
### guards
guards: [services]
```js
{
  name: 'brand-list',
  path: '/brand/list',
  component: pageBrandList,
  guards: [BrandListService]
}
```
### queryOptions
queryOptions: {options}
```js
// route.ts
switch (route.name) {
  case 'plugins-list':
    route.queryOptions = {
      a: { type: Number },
      b: { type: Number }
    }
    break
  default:
    break
}
```
## 自动生成路由
依据 pages 目录结构自动生成 vue-router 模块的路由配置。
```shell
pages/
--| user/
-----| login.vue
-----| login.service.ts
-----| one.vue
--| index.vue
```
按照这样的目录结构则会生成相对应的路由，服务名和视图名必须一致。
>  login.vue 需要服务要在同级目录下 写 login.service.ts

```js
// auto-generated-routes.ts
{
  name: 'account-login',
  path: '/user/login',
  component: pageUserLogin,
  guards: [userLoginService]
}
```
## 根据路由自动注入服务
guards 会去收集service关于路由钩子的实现
- beforeEach(跳转新路由 当前路由更新)

- beforeRouteEnter(路由跳转前)
  
  **使用这个钩子完成视图的初始化**
- beforeRouteUpdate(路由更新)
  
  **使用这个钩子完成视图的更新**

- afterEach(路由进入后 没有next())
```js
// login.service.ts
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'

@Injectable()
export class LoginService implements RouteGuard {
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
自动注入服务只能注入一个与视图名同名的服务，当然大部分业务开发都可以满足。但是还有一些视图需要多个全局服务 则可以手动写入
```js
// routes.ts
const prependGuards = (route: ServiceRouteConfig, guards: any[]) => {
  if (!route.guards) {
    route.guards = []
  }
  route.guards = [...guards, ...route.guards]
}
// guards 配置
if (route.name === 'account-login') {
  // 登录页面
  prependGuards(route, [
    HotReleaseService, 
    NProgressService,
    TitleService,
    RouteService
  ])
} else if (route.name === '404') {
  // 错误码404页面
  prependGuards(route, [
    HotReleaseService,
    NProgressService,
    TitleService,
    RouteService
  ])
} 
```
## title国际化
**规范：** title国际化的key值必须是 route.name 加 .title组合（必须遵守）
```js
// 规范title i18n 名称
// route.ts
if (route.name) {
  route.meta.title = `${route.name}.title`
}
```
## 设置视图layout
暂时框架有三个layout:
  - **default** 默认louyot
  - **login** 提供登录相关页使用
  - **blank** 空页面使用
  
  ```js
  // route.ts
   route.meta.layout = 'default' // 默认就是 default
    switch (route.name) {
      case 'account-login':
        route.meta.layout = 'login' // 设置 login layout
        break
      case '404':
        route.meta.layout = 'blank' // 设置 blank layout
        break
      case 'plugins-list':
        route.queryOptions = {
          a: { type: Number },
          b: { type: Number }
        }
        break
      default:
        break
    }
  ```
## url query字段的添加
可以在制定路由中手动添加queryOptions 在路由对象中route.meta.query即是queryOptions
```js
// route.ts
switch (route.name) {
  case 'plugins-list':
    route.queryOptions = {
      a: { type: Number, default: 6 },
      b: { type: Number }
    }
    break
  default:
    break
}
```
我们帮助业务开发者，写好了一个基类,可以根据路由参数生成query$，来获取路由上的query字段 完成视图查询条件的初始化
> 使用场景 假如是一个带搜索功能的列表 按照电话号码搜素员工，则可以看到制定的搜索列表，这时你想把这个视图搜索的指定列表给你同事看 则可以直接复制链接，出来的信息就是一致的
```js
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  query$: State<any>
  constructor() {
    this.query$ = new State({})
  }
  protected SET_SEARCH_QUERY(query: any) {
    this.query$.commit(() => query)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_SEARCH_QUERY(to.meta.query)
    next()
  }
}
```
在视图上的使用
```js
<div>query.a</div> // <div>query.a</div> 渲染成 <div>6</div>
export default {
  serviceInject() {
    return {
      route: RouteService // 将我们提供的路由基类服务添加
    }
  },
  rxState() {
    return {
      query: this.route.query$ // 获取初始化的路由query
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ query: this.query }) // 更新路由将query进行更新
    }
  }
}
```
