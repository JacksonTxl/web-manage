export const columns = () => [
  {
    title: '租赁柜号',
    dataIndex: 'serial_num',
    scopedSlots: { customRender: 'serial_num' }
  },
  {
    title: '剩余天数',
    dataIndex: 'remain_days',
    scopedSlots: { customRender: 'remain_days' }
  },
  {
    title: '租赁天数',
    dataIndex: 'lease_days',
    scopedSlots: { customRender: 'lease_days' }
  },
  {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '手机号',
    dataIndex: 'member_mobile',
    scopedSlots: { customRender: 'member_mobile' }
  },
  {
    title: '状态',
    dataIndex: 'lease_status',
    scopedSlots: { customRender: 'lease_status' }
  },
  {
    title: '到期日期',
    dataIndex: 'end_time',
    scopedSlots: { customRender: 'end_time' }
  },
  {
    title: '起租日期',
    dataIndex: 'start_time',
    scopedSlots: { customRender: 'start_time' }
  },
  {
    title: '销售人员',
    dataIndex: 'sale_name',
    scopedSlots: { customRender: 'sale_name' }
  },
  {
    title: '关联订单号',
    dataIndex: 'order_id',
    scopedSlots: { customRender: 'order_id' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
