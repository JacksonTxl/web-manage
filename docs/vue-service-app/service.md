# Service 服务

服务按照作用域大致分为两类 一类是全局使用的 一类是只是页面调用的，在框架中，每个服务都声明为一个类，并导出这个类以供依赖注入使用

## 简单例子

test.service.ts

```js
import { Injectable } from 'vue-service-app'

@Injectable()
class TestService {
  sayHello() {
    console.log('hello')
  }
}
```

:::tip 命名规范
服务以 Service 作为后缀
:::

App.vue
在 html 中注入该服务

```html
<template>
  <div>
    App
  </div>
</template>
<script>
  import { TestService } from './test.service'
  export default {
    serviceInject() {
      return {
        testService: TestService
      }
    },
    mounted() {
      this.testService.sayHello()
    }
  }
</script>
```

如果该服务依赖于其他服务,此处以依赖 router 为例

```js {5,7}
import { Injectable, ServiceRouter } from 'vue-service-app'

@Injectable()
class TestService {
  constructor(private router:ServiceRouter){}
  sayHello() {
    console.log(this.router)
    console.log('hello')
  }
}
```

这样在该类中就可以调用 router 实例了，这里使用了 ts 的修饰语法,在 constructor 中的属性添加如(privated,protected)时会自动执行 this.router = router

## 单例

框架默认注入类的行为是单例的

```html {12,16}
<template>
  <div>
    App
  </div>
</template>
<script>
  import { TestService } from './test.service'
  export default {
    serviceInject() {
      return {
        testService: TestService,
        testService2: TestService
      }
    },
    mounted() {
      console.log(this.testService === this.testService2) // true
    }
  }
</script>
```

:::tip
框架的默认注入方案是单例模式
:::
