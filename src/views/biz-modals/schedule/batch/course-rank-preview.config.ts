export const columns = (vm: any) => [
  {
    title: '星期',
    dataIndex: 'week_day',
    width: 80,
    scopedSlots: { customRender: 'week_day' }
  },
  {
    title: '课程',
    dataIndex: 'course_id',
    width: 124,
    scopedSlots: { customRender: 'course_id' }
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    width: 180,
    scopedSlots: { customRender: 'start_time' }
  },
  {
    title: `上课${vm.$c('coach')}`,
    dataIndex: 'coach_id',
    width: 124,
    scopedSlots: { customRender: 'coach_id' }
  },
  {
    title: '场地',
    dataIndex: 'court_id',
    width: 124,
    scopedSlots: { customRender: 'court_id' }
  },
  {
    title: '人数(人)',
    dataIndex: 'limit_num',
    width: 124,
    scopedSlots: { customRender: 'limit_num' }
  },
  {
    title: '预约价格(元)',
    dataIndex: 'course_fee',
    align: 'right',
    width: 124,
    scopedSlots: { customRender: 'course_fee' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
