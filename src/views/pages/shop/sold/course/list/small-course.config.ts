export const columns = (vm: any) => [
  {
    title: '小班课名称',
    dataIndex: 'course_name'
  },
  {
    title: '购买总课时',
    dataIndex: 'init_course_num'
  },
  {
    title: '剩余总课时',
    dataIndex: 'last_course_num',
    sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'member_name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '状态',
    dataIndex: 'course_status',
    scopedSlots: { customRender: 'course_status' }
  },
  {
    title: '结束日期',
    dataIndex: 'course_end_time'
  },
  {
    title: '开班日期',
    dataIndex: 'course_begin_time'
  },
  {
    title: '销售人员',
    dataIndex: 'sale_name'
  },
  {
    title: '负责人',
    dataIndex: 'staff_name'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
