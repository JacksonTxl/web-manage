### api 文件夹命名规范

所有的 api 文件夹下的 api 请求 ts 文件以后端的的控制器作为一类，并且以控制器作为名称，方便查找
`不判断`后端命名的正确性，为了快速定位 api 以防止重写
不需要前端判断该模块所属的前端分类，以后端分类为基准


- /captcha/phone -> `captcha.ts`
- /login/account -> `login.ts`
- /oauth/wechat -> `oauth.ts`
- /v1/account/bind/initiation -> `v1/account/bind.ts`
- /v1/shops/setting/stop/${id} => `v1/shops/setting/stop.ts`
- /v1/shops -> `v1/shops.ts`
