# Dependency Inject 依赖注入

框架是用依赖注入作为处理服务间的依赖，可以在构造时传入 providers

```js
import {TestService} from './test.service'
const {router} = new VueServiceApp({
  routes:{
    ...
  },
  // 服务供应商列表
  providers:[
    TestService
  ]
})

```
## useClass 注入类
该声明会向应用注册该服务，并且在需要使用的地方懒实例化该类，
该服务提供商的注册标识(provide)为 TestService 并使用单例化该类策略，上面这段代码等同于下面

```js
import {TestService} from './test.service'
...
  providers:[
    // provide为服务标识 useClass代表使用该类的单例
    { provide: TestService, useClass:TestService }
  ]
...
```


## useValue 注入常量
```js
const TOKEN = 'myValue'
const Value = 'hello world'

  ...

  providers:[
    { provide: TOKEN, useValue:Value }
  ]
  ...

```
这样就往容器上注入了一个常量


