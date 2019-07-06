export const columns = () => [
  {
    title: '卡名',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '剩余金额（元）',
    dataIndex: 'now_amount',
    scopedSlots: { customRender: 'now_amount' }
  },
  {
    title: '储值金额（元）',
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
    dataIndex: 'is_valid',
    scopedSlots: { customRender: 'is_valid' }
  },
  {
    title: '到期日期',
    dataIndex: 'end_time',
    scopedSlots: { customRender: 'end_time' }
  },
  {
    title: '购买日期',
    dataIndex: 'buy_time',
    scopedSlots: { customRender: 'buy_time' }
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
