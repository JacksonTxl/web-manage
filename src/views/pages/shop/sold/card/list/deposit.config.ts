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
    dataIndex: 'is_valid',
    scopedSlots: { customRender: 'is_valid' }
  },
  {
    title: '剩余储值（元）',
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
    title: '剩余本金（元）',
    dataIndex: 'now_non_discount_amount'
  },
  {
    title: '剩余赠送（元）',
    dataIndex: 'now_discount_amount'
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
    title: '消费储值（元）',
    dataIndex: 'consume_amount'
  },
  {
    title: '消费本金（元）',
    dataIndex: 'consume_principal'
  },
  {
    title: '消费赠送（元）',
    dataIndex: 'consume_discount'
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
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]

export const totalColumns = () => [
  {
    title: '剩余储值（元）',
    dataIndex: 'now_amount'
  },
  {
    title: '剩余本金（元）',
    dataIndex: 'now_non_discount_amount'
  },
  {
    title: '剩余赠送（元）',
    dataIndex: 'now_discount_amount'
  },
  {
    title: '储值金额（元）',
    dataIndex: 'init_amount'
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
    title: '消费储值（元）',
    dataIndex: 'consume_amount'
  },
  {
    title: '消费本金（元）',
    dataIndex: 'consume_principal'
  },
  {
    title: '消费赠送（元）',
    dataIndex: 'consume_discount'
  }
]
