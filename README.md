# saas-fe

## 初始化

请确保已全局安装 yarn

```
npm run init
```

### 开发

```shell
# linux macos windows 用户
npm run dev

# 如果有错误 分别执行
npm run serve
npm run gulp:dev

```

## 开发mock账号
abc123
abc123

## Todo List

- import {State} from 'rx-state' 的语法提示默认会是 rx-state/src 要修正.d.ts 文件

#### 更新日志

## Bugfix

- 降 less 版本为 2.7.2 修复引入 ant-design 包 less .bezierEasingMixin() 错误问题
- 去除 tslint 校验 使用 eslint 校验格式 使用 typescript 进行编译时错误
- fix 使用 docker 构建无法第二次构建的问题 借助 docker 的用户是 root 的机制
- 更新多主题方案 为一份静态 css 加一份 app.less 延时加载方案
