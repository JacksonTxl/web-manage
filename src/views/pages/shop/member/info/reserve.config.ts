export const cardItem = () => {
  return [
    {
      title: '合同编号',
      dataIndex: 'contract_number',
      key: 'contract_number'
    },
    {
      title: '卡类型',
      dataIndex: 'card_type',
      key: 'card_type'
    },
    {
      title: '卡名称',
      dataIndex: 'card_name',
      key: 'card_name'
    },
    {
      title: '购卡场馆',
      dataIndex: 'buy_shop_name',
      key: 'buy_shop_name'
    },
    {
      title: '支持入场场馆',
      dataIndex: 'use_shop_name',
      key: 'use_shop_name'
    },
    {
      title: '购买额度',
      dataIndex: 'init_amount',
      scopedSlots: { customRender: 'init_amount' }
    },
    {
      title: '剩余额度',
      dataIndex: 'remain_amount',
      scopedSlots: { customRender: 'remain_amount' }
    },
    {
      title: '卡状态',
      dataIndex: 'card_status',
      key: 'card_status',
      scopedSlots: { customRender: 'card_status' }
    },
    {
      title: '开卡日期',
      dataIndex: 'start_time',
      key: 'start_time'
    },
    {
      title: '到期日期',
      dataIndex: 'end_time',
      key: 'end_time'
    }
  ]
}

export const course = () => {
  return [
    {
      title: '合同编号',
      dataIndex: 'contract_number',
      key: 'contract_number'
    },
    {
      title: '课程类型',
      dataIndex: 'course_type',
      key: 'course_type'
    },
    {
      title: '课程名',
      dataIndex: 'course_name',
      key: 'course_name'
    },
    {
      title: '上课教练',
      dataIndex: 'coach_name',
      key: 'coach_name',
      scopedSlots: { customRender: 'coach_name' }
    },
    {
      title: '购买额度',
      dataIndex: 'init_course_num',
      key: 'init_course_num'
    },
    {
      title: '剩余额度',
      dataIndex: 'remain_course_num',
      key: 'remain_course_num'
    },
    {
      title: '状态',
      dataIndex: 'course_status',
      key: 'course_status',
      scopedSlots: { customRender: 'course_status' }
    }
  ]
}
export const leaseArk = () => {
  return [
    {
      title: '合同编号',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '类型',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '租赁柜号',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '租赁天数',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '剩余天数',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '状态',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '起租日期',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '到期日期',
      dataIndex: 'age',
      key: 'age'
    }
  ]
}
