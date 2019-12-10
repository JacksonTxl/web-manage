export const columns = () => [
  {
    title: '商品',
    dataIndex: 'key'
  },
  {
    title: '收货人',
    dataIndex: 'name',
    rowSpan: 2
  },
  {
    title: '手机号',
    dataIndex: 'age',
    rowSpan: 0
  },
  {
    title: '收货地址',
    dataIndex: 'tel',
    rowSpan: 0
  },
  {
    title: '创建时间',
    dataIndex: 'phone',
    rowSpan: 0
  },
  {
    title: '订单编号',
    dataIndex: 'address',
    rowSpan: 0
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    scopedSlots: { customRender: 'action' },
    rowSpan: 0
  }
]
