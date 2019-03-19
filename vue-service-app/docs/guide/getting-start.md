# Getting Start 快速开始

## 简单例子

项目依赖 typescript 的 reflect-metadata 特性进行注入
确保引入 vue-service-app 前先引入 reflect-metadata 库，
这里使用体积较小的[@abraham/reflection](https://www.npmjs.com/package/@abraham/reflection)库

main.ts

```ts {2}
import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
// 主视图组件
import App from './App.vue'

new Vue({
  el:'#app'
  router,
  render:h=>h(App)
})
```

::: warning
要保证vue-service-app 是最开始import的，不要后置,因为会做一些初始化设置
:::

bootstrap.ts
```ts
import VueServiceApp from 'vue-service-app'
import Vue from 'vue'

Vue.use(VueServiceApp)

const IndexComponet = {
  template: '<h1>Index</h1>'
}

const { router } = new VueServiceApp({
  routes: [
    {
      name: 'index',  // 此处name必填
      path: '/',
      component: IndexComponet
    }
  ],
  providers: []
})

export { router }
```
routes中我们声明了一条主路由,定义了首页的组件

App.vue

```html
<template>
  <div>
    Hello App
    <router-view></router-view>
  </div>
</template>
```
打开页面 可以看见该条路由生效了



