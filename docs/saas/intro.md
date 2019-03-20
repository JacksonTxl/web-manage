# Introduction 介绍

Saas2.0 系统在原有的 vue 生态上，借鉴 angular 的思想，实现了依赖注入，响应式编程，面向对象等特性，为大型中后台应用提供了一整套解决方案

## 知识储备

saas 项目使用了如下技术栈 如以前从未接触过的，可至以下网站进行了解

- [typescript 3.3 版本](https://www.tslang.net/basic-types.html)
- [rxjs v6 版本](http://www.cnblogs.com/ang-/p/9514430.html) rxjs v6 的学习指南
- [vue 2.6^版本](https://cn.vuejs.org/v2/guide/)
- [vue-router](https://router.vuejs.org/zh/)
- [vue-service-app](/vue-service-app/intro.html) 基于 vue-router 的依赖注入框架

## 前序准备

- nodejs 8.12.0 以上版本

### 包管理规范

Saas 项目使用 yarn 作为包管理工具，有如下优势

- 依赖缓存
- yarn.lock 锁定依赖版本 统一开发和生产环境依赖

#### 安装 yarn

国内源比较慢 使用淘宝源安装 yarn 到全局

```shell
npm i yarn -g --registry=https://registry.npm.taobao.org
```

#### 配置 registry

配置为淘宝源 下载速度会快点

```shell
yarn config set registry https://registry.npm.taobao.org
```

## 目录结构

## 安装

```shell
npm run init

```

## Git 分支

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
