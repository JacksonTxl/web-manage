export const columns = [
  {
    title: '预约日期',
    dataIndex: 'start_date',
    scopedSlots: { customRender: 'start_date' }
  },
  {
    title: '预约时间',
    dataIndex: 'start_time'
  },
  {
    title: '会员姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '课程名称',
    dataIndex: 'course_name'
  },
  {
    title: '上课教练',
    dataIndex: 'coach_name'
  },
  {
    title: '消费方式',
    dataIndex: 'consume_name'
  },
  {
    title: '预约状态',
    dataIndex: 'reserve_status',
    scopedSlots: { customRender: 'reserve_status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
