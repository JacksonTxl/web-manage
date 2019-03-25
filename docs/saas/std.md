# Standard 命名规范

saas 集成了 eslint 做 typesciprt 的语法检查,本身不规范的 js 代码[无法]提交
可以在 saas 的各个文件夹下的 readme.md 查看规范

## 文件命名规范

- 全部小写，如两个单词 使用 `-` 分割 特定类型的使用 `.`分割

:smile: 正确

```shell
hot-release.service.ts # 服务类
date.filters.ts # 过滤器类
app.d.ts # 声明文件
```

:imp: 错误

```shell
hot_release.ts
```

### api

所有的 api 文件夹下的 api 请求 ts 文件以后端的的控制器作为一类，并且以控制器作为名称，方便查找
不判断后端命名的正确性，为了快速定位 api 以防止重写

- /captcha/phone -> `captcha.ts`
- /login/account -> `login.ts`
- /oauth/wechat -> `oauth.ts`
- /v1/account/bind/initiation -> `v1/account/bind.ts`

### 服务文件

所有的服务文件以 `[name].service.ts` 命名

### 过滤器

过滤器类别使用 `.filters.ts`结尾，里面的过滤器使用`Filter`结尾

### 样式文件

入口文件使用小写，`@import`的其他样式文件使用 `_`开头

:smile: 正确

```shell
app.less
_vars.less
_helpers.less
```

app.less

## 变量命名

变量，属性，方法等使用驼峰命名

### 流式状态命名

所有的流式状态以`$`结尾 如

:smile:正确

```ts
const state$ = new State({ a: 1 })
const a$ = state$.pipe(pluck('a'))
```

:imp: 错误

```ts
const state = new State({ a: 1 })
```

```less
@import '_vars.less';
```
### 类命名
样式类名使用 BEM 标准，指定类型的需要添加前缀

- 页面类 `page-`
- 组件和模态窗 `st-`
- 布局类 `layout-`

组件使用 bem 规范命名
btn.vue

```html
<template>
  <div class="st-btn">
    <span class="st-btn__loading">icon</span>
    <span class="st-btn__text">text</span>
  </div>
</template>
```
