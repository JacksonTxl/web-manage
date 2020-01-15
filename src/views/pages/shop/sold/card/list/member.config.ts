export const columns = () => [
  {
    title: '卡名',
    dataIndex: 'card_name',
    fixed: 'left',
    width: 180,
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '状态',
    fixed: 'left',
    width: 100,
    dataIndex: 'card_status',
    scopedSlots: { customRender: 'card_status' }
  },
  {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
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
    title: '剩余摊销金额（元）',
    dataIndex: 'amortization_amount'
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
    title: '合同编号',
    dataIndex: 'contract_number',
    scopedSlots: { customRender: 'contract_number' }
  },
  {
    title: '合同类型',
    dataIndex: 'transfer_type'
  },
  {
    title: '合同原价（元）',
    dataIndex: 'total_price'
  },
  {
    title: '实收金额（元）',
    dataIndex: 'pay_price'
  },
  {
    title: '优惠金额（元）',
    dataIndex: 'discount_price'
  },
  {
    title: '减免金额（元）',
    dataIndex: 'reduce_price'
  },
  {
    title: '是否退款',
    dataIndex: 'is_refund'
  },
  {
    title: '退款金额（元）',
    dataIndex: 'refund_price'
  },
  {
    title: '入场次数',
    dataIndex: 'entrances_times'
  },
  {
    title: '约课次数',
    dataIndex: 'reserve_times'
  },
  {
    title: '爽约次数',
    dataIndex: 'cancel_times'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]

export const totalColumns = () => [
  {
    title: '剩余额度（次）',
    dataIndex: 'remain_amount'
  },
  {
    title: '剩余摊销金额（元）',
    dataIndex: 'amortization_amount'
  },
  {
    title: '实收总金额（元）',
    dataIndex: 'pay_price'
  },
  {
    title: '优惠总金额（元）',
    dataIndex: 'discount_price'
  },
  {
    title: '减免总金额（元）',
    dataIndex: 'reduce_price'
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'refund_price'
  },
  {
    title: '入场总次数',
    dataIndex: 'entrances_times'
  },
  {
    title: '约课总次数',
    dataIndex: 'reserve_times'
  },
  {
    title: '爽约总次数',
    dataIndex: 'cancel_times'
  }
]
