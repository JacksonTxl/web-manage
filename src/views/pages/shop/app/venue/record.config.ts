export const columns = [
  {
    title: '预约人',
    dataIndex: 'member_name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '下单时间',
    dataIndex: 'created_time'
  },
  {
    title: '预约来源',
    dataIndex: 'order_source',
    scopedSlots: { customRender: 'order_source' }
  },
  {
    title: '预约状态',
    dataIndex: 'reserve_status',
    scopedSlots: { customRender: 'reserve_status' }
  },
  {
    title: '支付状态',
    dataIndex: 'pay_status',
    scopedSlots: { customRender: 'pay_status' }
  },
  {
    title: '操作',
    key: 'operation',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

export const subColumns = [
  {
    title: '预约日期',
    dataIndex: 'reserve_date'
  },
  {
    title: '预约场馆',
    dataIndex: 'venues_name'
  },
  {
    title: '预约场地',
    dataIndex: 'site_name'
  },
  {
    title: '预约时间段',
    dataIndex: 'reserve_time'
  },
  {
    title: '预约状态',
    dataIndex: 'reserve_status',
    scopedSlots: { customRender: 'reserve_status' }
  },
  {
    title: '操作',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
]
