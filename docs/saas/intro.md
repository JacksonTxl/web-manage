# Introduction 介绍

Saas2.0 系统在原有的 vue 生态上，借鉴 angular 的思想，实现了依赖注入，响应式编程，面向对象等特性，为大型中后台应用提供了一整套解决方案

## 知识储备

saas 项目使用了如下技术栈 如以前从未接触过的，可至以下网站进行了解

- [typescript 中文手册](https://www.tslang.net/basic-types.html)
- [rxjs v6 学习指南](http://www.cnblogs.com/ang-/p/9514430.html)
- [vue 官方网站](https://cn.vuejs.org/v2/guide/)
- [vue-router 官方网站](https://router.vuejs.org/zh/)
- [vue-service-app](/vue-service-app/intro.html) 基于 vue-router 的依赖注入框架

## 项目架构图



## 前序准备

- nodejs 8.12.0 以上版本

## 目录结构

```shell
├── App.less
├── App.vue # 主视图入口
├── main.ts # 入口文件
├── bootstrap.ts # 应用启动文件
├── providers.ts # 依赖注入供应商
├── api   # api 后端请求目录
│   ├── api.ts # api请求基类
│   ├── login.ts # api请求类 命名与后端action一致
├── assets # 静态资源
│   ├── audio
│   ├── font
│   ├── iconfont
│   ├── img
│   ├── readme.md
│   └── video
├── constants # 常量
│   ├── config.ts # 应用配置类
├── filters # 过滤器
│   ├── currency.filters.ts #现金过滤器类
│   ├── date.filters.ts # 日期过滤器类
│   ├── decimal.filters.ts # 数字过滤器类
│   └── resource.filters.ts # 资源过滤器类
├── i18n # 多语言文件
│   ├── en_US.js
│   └── zh_CN.js
├── modal-router # 模态窗路由
│   ├── index.ts
│   └── routes.ts
├── operators # rxjs 操作符
│   ├── ajax-retry.ts
│   └── numberic.ts
├── polyfills # polyfill
│   ├── readme.md
│   └── register.ts
├── router # 路由相关
│   ├── auto-generated-routes.ts
│   └── routes.ts
├── services # 全局的服务、路由守卫、状态容器类目录
│   ├── auth.service.ts
│   ├── hot-release.service.ts
│   ├── http.service.ts
│   ├── i18n.service.ts
│   ├── message.service.ts
│   ├── notification.service.ts
│   ├── nprogress.service.ts
│   ├── oss.service.ts
│   ├── route.service.ts
│   ├── theme.service.ts
│   ├── title.service.ts
│   └── user.service.ts
├── style # 样式文件
│   ├── _helpers.less
│   ├── _nprogress.less
│   ├── _vars.less
│   └── index.less
├── types # typesciprt 类型声明
│   ├── app.d.ts # 需要引入的类型声明
│   ├── declare.d.ts # 全局类型声明
├── utils # 工具函数目录 该目录下只存放纯函数
│   └── webpack-key-path.ts
└── views # 视图层文件夹
    ├── index.less # views下的样式引导文件
    ├── components # 可复用组件
    ├── layouts # 布局视图文件
    ├── modals  # 模态窗视图文件
    └── pages # 页面视图文件
```

## 安装

clone 下仓库后 执行一下命令进行仓库初始化依赖等

```shell
npm run init
```

开发业务

```
npm run dev
```

开发本说明文档

```
npm run dev:docs
```




## Git 分支模型

saas 下的分支模型使用 gitlab-flow 模型，并且集合了持续集成，默认的构建的触发条件为

- `dev*/feat*` 分支 -> 自动发往 dev 环境
- `test` 分支 -> 自动发往 test 环境
- `master` 分支 -> 自动发往 pre 环境

`production`分支用于正式环境，现不支持自动发布，须手动发布

一般情况下如果要增加一个特性分支，遵循一下步骤

1. 我们从`master`分支切出一个分支 命名为`feat_f1`
2. 在`feat_f1`上开发，并提交和 push 到远端，远端会自行构建发布至 dev 环境服务器
3. 特性开发完成并自测通过，将该分支 merge 到`test`分支，
4. 如果多个 feat 之间有冲突，请一起解决，合并成功后 push，远端会自行构建发布至 test 环境服务器
5. test 环境没问题了在 gitlab 上提交 merge request 合并该特性分支,
6. 相关负责人进行 code review，提出意见进行修正
7. merge request 成功后，远端会自行构建发布至 pre 环境服务器
8. 最后测试没问题了，由管理员将 master 合并至`production`分支并进行手动发布
