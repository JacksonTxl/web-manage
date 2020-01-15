export const columns = (vm: any) => [
  {
    title: '课程名',
    dataIndex: 'course_name',
    fixed: 'left',
    width: 180,
    scopedSlots: { customRender: 'course_name' }
  },
  {
    title: '状态',
    fixed: 'left',
    width: 100,
    dataIndex: 'course_status',
    scopedSlots: { customRender: 'course_status' }
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
    title: '剩余课时',
    dataIndex: 'remain_course_num',
    scopedSlots: { customRender: 'remain_course_num' }
  },
  {
    title: '购买课时',
    dataIndex: 'init_course_num',
    scopedSlots: { customRender: 'init_course_num' }
  },
  {
    title: '实收单价（元）',
    dataIndex: 'unit_price'
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
    title: '购买日期',
    dataIndex: 'buy_time',
    scopedSlots: { customRender: 'buy_time' }
  },
  {
    title: `上课${vm.$c('coach')}`,
    dataIndex: 'coach_name',
    scopedSlots: { customRender: 'coach_name' }
  },
  {
    title: `${vm.$c('coach')}级别`,
    dataIndex: 'coach_level',
    scopedSlots: { customRender: 'coach_level' }
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
    title: '是否退款（元）',
    dataIndex: 'is_refund'
  },
  {
    title: '退款金额（元）',
    dataIndex: 'refund_price'
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
    title: '剩余课时（节）',
    dataIndex: 'remain_course_num'
  },
  {
    title: '购买课时（节）',
    dataIndex: 'init_course_num'
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
    title: '约课总次数',
    dataIndex: 'reserve_times'
  },
  {
    title: '爽约总次数',
    dataIndex: 'cancel_times'
  }
]
