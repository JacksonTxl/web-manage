# Service 服务
Service，更准确的说是提供某些基础服务的Class。Service最大的特点是可以通过[RxJs](https://rxjs.dev/)的流式状态，实现Service的单向状态流。单向状态流能让你更好的管理和理解状态。Service大概长这样：
```js
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

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

上例是一个操作（格式化）query的Service。其中，**Injectable**是一个实现注入其它Service到当前Service的修饰器；而**RouteGuard**的实现（implements）,需要配合route的钩子一起使用，上例中是**beforeEach**，功能是实现路由拦截，使得当前Serveice能在route钩子（beforeEach）里做些事情。

## Service list 服务参考列表
- ### *hot-release.service*
  > 热更新。通过在路由跳转时，检查**版本号**是否一致，实现在发布新版后静态文件的及时更新。
- ### *nprogress.service*
  > 加载进度条。通过在**RouteGuard**，实现路由跳转时的页面加载进度条。
- ### *auth.service*
  > 实现对**TOKEN**的操作，如，存、取、设置等。在特定的路由跳转时，进行**TOKEN**的判断，从而控制是否重定向到login页面。
- ### *title.service*
  > 实时设置页面title。通过在**RouteGuard**，实现路由跳转时的实时设置页面title。
- ### *user.service*
  > 操作全局的user以及menu状态。
- ### *route.service*
  > 实现对query数据的操作，生成并返回一个流（query$）。
- ### *http.service*
  > http的基础服务。使用[**RxJs**](https://rxjs.dev/)的ajax,实现流式的http的基础服务。
- ### *oss.service*
  > 文件上传基础Service。使用**FormData**对象和[**RxJs**](https://rxjs.dev/)的ajax,实现对接阿里云的[**OSS**](https://cn.aliyun.com/product/oss)**的文件上传基础Service。
- ### *i18n.service*
  > 国际化的基础服务。
- ### *theme.service*
  > 动态换主题。
- ### *message.service*
  > 全局提示。使用[ant-design-vue](https://vue.ant.design/docs/vue/introduce-cn/)的**message**组件，重新封装了全局提示。
- ### *notitication.service*
  > 通知提醒框。使用[ant-design-vue](https://vue.ant.design/docs/vue/introduce-cn/)的**notification**组件，重新封装了通知提醒框。

## write Service 编写服务
写Service时，应当遵循以下规则：
1. Service里有流时，流的命名应该以'$'结尾，如
```js
let gymList$ = ajax.get('https://xxx.xxx.xxx/gym/list')

```

2. 命名需为类似xxx.service.ts格式，views页面的js文件也须如此命名。如
```js
`user.service.ts`
```
::: danger 命名强调
/src/views/pages下的页面必须以 xxx.service.ts 格式命名，否则自动路由将不会正常工作。原委请参考[路由](/saas/router.md)
:::
3. Service的接口需要单个多行注释，如
```js {2-4,6-9,11-13,15-17}
interface RequestOptions {
  /**
   * oss直传地址
   */
  url: string
  /**
   * oss直传的key
   * @description 默认值为一个16位的随机数;oss直传时是一个必传字段,同一个key&&同一hash，会覆盖，否则push
   */
  key?: string
  /**
   * 上传的文件
   */
  file: any
  /**
   * 上传进度cb
   */
  uploadProgress?: (val: any) => any
}
```
4. implements RouteGuard时（RouteGuard请参考[路由](/saas/router.md)），需在Service（Class）里使用路由钩子(beforeEach等)，同时请注意，在恰当的时候要next()，如此才能在路由跳转时执行相对应的逻辑。如
```js {1,5}
export class RouteService implements RouteGuard {
  constructor() {
    //...
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    //...
    next()
  }
}
```
5. Service里的Injectable。当需要注入其它Service的功能时，需先执行@Injectable(),后在Class.constructor里挂载。如
```js {1,3}
@Injectable()
export class HotReleaseService {
    constructor(private appConfig: AppConfig) {}
    getData(){
        // 在当前Class内，可以用this.appConfig访问
        console.log(this.appConfig)
    }
}
```

## use Service 使用服务
使用Service时，只需要在页面引入需要的Service,并在serviceInject方法里返回，即可在当前的Vue实例作用域内访问，并且当前页面对Service状态的修改并不会影响Service原始的状态。值得注意的是，当前页面里访问的是一个单例。如
```js {2,4-8}
<script>
import { OssService } from '@/services/oss.service'
export default {
  serviceInject() {
    return {
      OSS: OssService
    }
  },
  methods: {
    upload(data) {
      this.OSS.put({...})
    }
  }
}
</script>
```
