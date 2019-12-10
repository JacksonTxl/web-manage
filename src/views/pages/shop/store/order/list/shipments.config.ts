export const columns = () => [
  {
    title: '商品',
    dataIndex: 'childrens',
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
    dataIndex: 'time'
  },
  {
    title: '订单编号',
    dataIndex: 'time'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
