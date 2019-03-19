# saas-fe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
## Todo List

* saas-dev-ui 域名更换
* 主题下themes文件夹目录分类
* ant-design-vue 的全量样式包太大 考虑分离为基础的样式和 views的样式的入口less分开引入 以减少开发时间
* ant-design-vue 与sytd-less-base/main-atom的mixin包冲突 导致无法编译less


* vue-service-app 的新结构文档补齐
* 自动路由生成 子路由的和子页面的名称可能会相同 现在的未考虑这种情况

* import {State} from 'rx-state' 的语法提示默认会是rx-state/src 要修正.d.ts文件
* css extract
* 编写ossService




#### 更新日志


## Bugfix
* 降less版本为2.7.2 修复引入ant-design包less .bezierEasingMixin() 错误问题
* 去除tslint校验 使用eslint校验格式 使用typescript进行编译时错误
* fix使用docker构建无法第二次构建的问题 借助docker的用户是root的机制
