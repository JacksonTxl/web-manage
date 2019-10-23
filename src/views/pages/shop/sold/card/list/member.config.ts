export const columns = () => [
  {
    title: '卡名',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '剩余额度',
    dataIndex: 'remain_amount',
    scopedSlots: { customRender: 'remain_amount' }
  },
  {
    title: '初始额度',
    dataIndex: 'init_amount',
    scopedSlots: { customRender: 'init_amount' }
  },
  {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '状态',
    dataIndex: 'card_status',
    scopedSlots: { customRender: 'card_status' }
  },
  {
    title: '到期日期',
    dataIndex: 'end_time',
    scopedSlots: { customRender: 'end_time' }
  },
  {
    title: '是否开卡',
    dataIndex: 'is_open',
    scopedSlots: { customRender: 'is_open' }
  },
  {
    title: '开卡日期',
    dataIndex: 'start_time',
    scopedSlots: { customRender: 'start_time' }
  },
  {
    title: '销售人员',
    dataIndex: 'staff_name',
    scopedSlots: { customRender: 'staff_name' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
