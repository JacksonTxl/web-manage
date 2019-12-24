export const columns = () => [
  {
    title: '商品',
    dataIndex: 'product',
    width: 330,
    scopedSlots: { customRender: 'product' }
  },
  {
    title: '会员名称',
    dataIndex: 'member_name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '订单编号',
    dataIndex: 'id'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
