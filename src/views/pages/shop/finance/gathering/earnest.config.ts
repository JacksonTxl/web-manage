export const columns = () => [
  {
    title: `定金金额（元）`,
    dataIndex: 'price'
  },
  {
    title: '姓名',
    dataIndex: 'member_name'
  },
  {
    title: '手机号',
    dataIndex: 'member_mobile'
  },
  {
    title: '状态',
    dataIndex: 'use_status',
    scopedSlots: { customRender: 'use_status' }
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    scopedSlots: { customRender: 'created_time' }
  },
  {
    title: '定金订单号',
    dataIndex: 'order_id'
  },
  {
    title: '销售人员',
    dataIndex: 'seller'
  },
  {
    title: '收款人',
    dataIndex: 'payee'
  },
  {
    title: '定金签单时间',
    dataIndex: 'use_order_created_time'
  },
  {
    title: '签单订单号',
    dataIndex: 'use_order_id'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
