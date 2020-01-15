export const columns = () => [
  {
    title: '课程包名',
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
    title: '课程包类型',
    dataIndex: 'package_type',
    scopedSlots: { customRender: 'package_type' }
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
    title: '购买总课时/团课课时/私教课时',
    dataIndex: 'buy_course_num',
    scopedSlots: { customRender: 'buy_course_num' }
  },
  {
    title: '剩余总课时/团课课时/私教课时',
    dataIndex: 'remain_course_num',
    scopedSlots: { customRender: 'remain_course_num' }
  },
  {
    title: '剩余摊销金额（元）',
    dataIndex: 'amortization_amount'
  },
  {
    title: '到期日期',
    dataIndex: 'course_end_time',
    scopedSlots: { customRender: 'course_end_time' }
  },
  {
    title: '购买日期',
    dataIndex: 'course_buy_time',
    scopedSlots: { customRender: 'course_buy_time' }
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
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export const totalColumns = () => [
  {
    title: '剩余总课时（节）',
    dataIndex: 'remain_course_num'
  },
  {
    title: '剩余团课课时（节）',
    dataIndex: 'team_course_remain'
  },
  {
    title: '剩余私教课时（节）',
    dataIndex: 'personal_course_remain'
  },
  {
    title: '购买总课时（节）',
    dataIndex: 'buy_course_num'
  },
  {
    title: '购买团课课时（节）',
    dataIndex: 'team_course_init'
  },
  {
    title: '购买私教课时（节）',
    dataIndex: 'personal_course_init'
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
