# Views 视图层
## components 组件
目录里面存放不同业务模块可复用的组件
- 表格组件
- 翻页组件
- 排课日历
- 等等...
## layouts 布局
提供了四个layout
- default（默认布局）
- login（登录页面布局）
- loading（加载...）
- blank(404使用)
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
## modal 模态窗
基于[vue-modal-router](https://www.npmjs.com/package/vue-modal-router)进行模态窗开发
vue-modal-router 实现了模态窗绑定路由
[查看文档](https://www.npmjs.com/package/vue-modal-router)
## pages 视图页面
- 主要是业务页面开发，按照业务模块组织目录。
- 里面放页面组件 和 对应的页面服务
- 页面服务一定要在相关页面的同级目录下 且文件名相同奖赏 文件名.service.ts

