export const columns = () => [
  {
    title: '课程名',
    dataIndex: 'course_name',
    scopedSlots: { customRender: 'course_name' }
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
    title: '教练级别',
    dataIndex: 'coach_level',
    scopedSlots: { customRender: 'coach_level' }
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
    dataIndex: 'course_status',
    scopedSlots: { customRender: 'course_status' }
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
    title: '上课教练',
    dataIndex: 'coach_name',
    scopedSlots: { customRender: 'coach_name' }
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
