# Views 视图层
视图层，是基于vue进行组件式开发完成视图层工作。提供复用组件，达到一处开发多处使用的效果；还有页面布局，为页面整体布局做一些准备工作；我们有我们自己模态窗，有更多的自己思考，更实用更贴合我们的项目开发；最重要的就是我们视图页面，主要是我们页面输出的地方，这里面有一些强制性开发规范，要严格执行才会发挥框架更大的威力

## layouts 布局
### 概念
暂时提供了四个layout，用于页面的整体布局。
- default（默认布局）
  **页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。**

下面还有三个辅助布局
- login **用于登录 和 注册**
- loading **用于一些加载页面 骨屏 和 加载gif**
- blank **空页面**
### 使用 :tada: :100: ;)
在 route.ts 中视图对应的路由对象中的meta.layout属性 属性值填写 'default' | 'login' | 'blank' | 'loading' 四个值代表四种布局
|    key    | value         | type  |
| ------------- |:-------------:| -----:|
|  meta.loyout  | 'default' \| 'login' \| 'blank' \| 'loading' |string|

```js
// route.ts

route.meta.layout = 'default' // 默认就是 default
switch (route.name) {
  case 'user-login':
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
## pages 视图页面
### 概念
视图页面开发，视图组件主要是前端交互逻辑开发，视图服务（Class）类使用ts + rxjs进行业务数据逻辑处理服务， 达到很好的业务数据和前端交互逻辑分离效果。这样开发会更清晰

**规范：**
最好是按照业务名命名
- 视图组件 (业务名.vue)
  
  **serviceInject** 视图组件获取service服务类（注入机制）,为视图提供数据

  **rxState**  视图组件获取rxjs流里面的数据
- 给视图提供的服务类 (业务名.service.ts)
  
  为视图组件**准时有效**的提供业务数据服务😸 
  - **准时**，借助vue-router提供的路由周期钩子，在适当的时候提供对应的数据。
  
    初始化数据获取就可以放到路由钩子**beforeRouteEnter**进行获取，这样就可以路由跳转前拿到视图初始数据

    如果需要视图不改变只是通过不同query得到数据更新，则可以使用beforeUpdateEnter进行获取，这样就可以在路由改变视图不变完成部分数据更新的效果

    还有一个 **beforeEach** 这是路由进入 和 更新前运行的钩子，当有一个请求服务即初始化需要请求路由更新也要则可以将这个请求放到beforeEach处理

  - **有效**，将请求返回过来数据进行处理（冗余，多余，计算）输出较精简的更符合视图组件的字段
  
    一般请求回来的数据都需要，前端进行一些数据类型转化，去除冗余数据字段，才能符合视图使用与展示。
- 对应视图子组件 (业务名.子组件名.vue)
  
  按照组件开发的原则，视图组件**不宜太大**分块抽取小业务组件是很有必要的。使用v-for循环的时候里面的item模块也可以抽取成业务子组件，可以对item里面的字段提供组件能力处理 
**视图组件** serviceInject rxState的使用
> 看下面例子
```js
export default {
  ...
  // 获取视图需要的服务
  serviceInject() {
    return {
      themeService: ThemeService,
      llfService: LlfService,
      route: RouteService // 路由服务
    }
  },
  // 获取rx流的数据
  rxState() {
    return {
      query: this.route.query$ // 获取路由对象的饿query字段
    }
  },
  data() {
    return {
      isSwitching: false
    }
  }
  ...
}
```
上面的例子中 query 字段 和 计算属性 data props是一个级别的 直接this.query即可

**服务类** 面向对象 一个class类（类名要求首字符大写驼峰模式）
> 举个例子
```js
// login.service.ts
// 使用 vue-service-app提供的能力
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'

@Injectable() // 有了这个修饰符 LoginService就可以被视图组件使用serviceInject依赖注入使用 
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
## modal 模态窗
### 概念
基于[vue-modal-router](https://www.npmjs.com/package/vue-modal-router)进行模态窗开发
vue-modal-router 实现了模态窗绑定路由
可以优雅的对spa模态窗进行管理，和以前的错乱无章的modal窗分布，管理难说拜拜了
在App.vue中 使用 modal-router-view 组件使所有模态窗都在这里布局，在**mian.ts**中声明管理模态窗的对象，所有模态窗对象都在这里**配置**。
在**views**的modal中写好模态窗的业务 暴露事件 模态窗显示与隐藏的的初始值
在相关业务需要使用模态窗的视图里面 使用**modal-link**组件调用模态组件 tag设置样式 to 参数设置需要弹出模态窗的名字，和 需要响应的事件
### 使用
类似与vue-router使用的方式：有modal 和 modal-link
modal的使用

第一步: 写好modal组件 一定要绑定一个show状态 决定模态框的显示不显示
```js
<template>
  <!-- your modal component -->
  <modal v-model='show'>
    <h1>something</h1>
    <button @click='onTest'>test</button>
  </modal>
</template>
 
<script>
  export default {
    props:['a','b'],
    data(){
      return { 
        show: false
      }
    },
    methods:{
      onTest(){
        this.$emit('test')
      }
    }
  }
 
</script> 
```

第二步: 在App.vue中使用modal-router-view，在mian.ts中声明模态窗管理对象
App.vue
```js
// App.vue
<template>
  <div id='app'>
    <router-view></router-view>
    <!-- modal placeholder -->
    <modal-router-view></modal-router-view>
  </div>
</template>
```
mian.ts
```js
// main.ts
import Vue from 'vue'
import VueModalRouter from 'vue-modal-router'
 
import CustomEdit from './custom-edit.vue'
Vue.use(VueModalRouter)
 
const modalRouter = new VueModalRouter({
  model:'show', // this should be equal to modal component model name
  delay: 300, // delay time to destroy modal instance
  routes:[
    {
      name:'custom-edit',
      component: CustomEdit
    }
  ]
})
 
new Vue({
  el:'#app',
  modalRouter
})
```
第四步: 再需要模态窗的视图页面调用相关模态窗组件
```js
<template>
  <!-- button to open modal -->
  <modal-link tag='button' :to="{ name: 'custom-edit', on: {test: onModalTest } }">
    open custom edit modal
  </modal-link>
</template>
 
<script>
export default {
  methods: {
    onModalTest(){
      console.log('get modal event here')
    }
  }
}
</script> 
```
## components 组件

- 表格组件
- 翻页组件
- 排课日历
- 等等...



