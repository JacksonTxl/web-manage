export const basicColumns = (vm: any) => [
  {
    title: '教练',
    dataIndex: 'name'
  },
  {
    title: '教练等级',
    dataIndex: 'level'
  },
  {
    title: '在职状态',
    dataIndex: 'nature_work'
  }
]
export const classColumns = (vm: any) => [
  {
    title: '学员',
    // dataIndex: 'user_name',
    scopedSlots: { customRender: 'user_name' }
  },
  {
    title: '联系电话',
    dataIndex: 'phone'
  },
  {
    title: '购买课时',
    dataIndex: 'buy_class_hours'
  },
  {
    title: '请假课时',
    scopedSlots: { customRender: 'leave_class_hours' },
    dataIndex: 'leave_class_hours'
  },
  {
    title: '旷课',
    scopedSlots: { customRender: 'truancy_class_hours' },
    dataIndex: 'truancy_class_hours'
  },
  {
    title: '已签到课时',
    scopedSlots: { customRender: 'sign_class_hours' },
    dataIndex: 'sign_class_hours'
  }
]
export const classEndColumns = (vm: any) => [
  {
    title: '学员',
    // dataIndex: 'user_name',
    scopedSlots: { customRender: 'user_name' }
  },
  {
    title: '联系电话',
    dataIndex: 'phone'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]
