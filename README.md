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

```

本地使用test的api
```shell
npm run dev:test
```

## 开发mock账号
abc123
abc123


## 更新日志 2019-09-29
* https://gitlab.styd.cn/fe/saas/web/wikis/saas2.0%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91checklist 使用checklist 查看有没有遗漏项目
* 样式指导 业务样式不许出现在styles中，一部分只是简单的样式不够成为组件的放置于_components.less中 命名空间为.st- 不要使用.global 尽量思考样式的归属是谁
* st-input-search 有默认统一宽度了 并且新增width属性
* 新增st-search-panel-item 组件 用于筛选区布局
* userService.getOptions$(enumKey,{addAll:true}) 支持addAll选项 默认增加{value:-1,label:'全部'} 的选项
* st-form-item 新增 type='text' 属性修正表单高度

