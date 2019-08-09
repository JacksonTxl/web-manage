## 后端接口黑名单

- [入口地址][错误地址url] [问题]

  /brand/marketing/activity => /v1/setting/mina/activity_list: 返回过来 data 是个数组 应该是 data： {list: []}
  /brand/marketing/activity => /v1/setting/mina/index: 返回过来 data 是个数组 应该是 data： {list: []}
  /brand/marketing/activity => /v1/setting/mina/tabbar: 返回过来 data 是个数组 应该是 data： {list: []}
  /brand/finance/salary/template/performance 返回过来 data 数据有问题，list{list:[]}


