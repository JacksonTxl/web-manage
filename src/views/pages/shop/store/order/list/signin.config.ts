export const columns = () => [
  {
    title: '商品',
    dataIndex: 'childrens',
    width: 330,
    scopedSlots: { customRender: 'childrens' }
  },
  {
    title: '收货人',
    dataIndex: 'ren'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  },
  {
    title: '收货地址',
    dataIndex: 'adress'
  },
  {
    title: '创建时间',
    dataIndex: 'times'
  },
  {
    title: '订单编号',
    dataIndex: ''
  },
  {
    title: '快递公司',
    dataIndex: ''
  },
  {
    title: '快递单号',
    dataIndex: ''
  }
]
