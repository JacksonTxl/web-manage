# Package Manager 包管理

使用yarn作为包管理工具，有如下优势

* 依赖缓存
* yarn.lock 锁定依赖版本 统一开发和生产环境依赖

## 安装yarn
国内源比较慢 使用淘宝源安装yarn到全局
```shell
npm i yarn -g --registry=https://registry.npm.taobao.org
```

## 配置registry
配置为淘宝源
```shell
yarn config set registry https://registry.npm.taobao.org
```


## 安装项目所在依赖
```shell
yarn install
```

## 添加项目依赖
安装运行依赖 至package.json 的 "dependencies" 字段
```shell
yarn add qs -S
```
安装开发依赖 至package.json 的 "devDependencies" 字段
```shell
yarn add babel -D
```

