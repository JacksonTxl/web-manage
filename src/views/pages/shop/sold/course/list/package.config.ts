export const columns = () => [
  {
    title: '课程包名',
    dataIndex: 'course_name',
    scopedSlots: { customRender: 'course_name' }
  }, {
    title: '购买总课时',
    dataIndex: 'buy_course_num',
    scopedSlots: { customRender: 'buy_course_num' }
  }, {
    title: '剩余总课时',
    dataIndex: 'remain_course_num',
    scopedSlots: { customRender: 'remain_course_num' }
  }, {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  }, {
    title: '状态',
    dataIndex: 'course_status',
    scopedSlots: { customRender: 'course_status' }
  }, {
    title: '到期日期',
    dataIndex: 'course_end_time',
    scopedSlots: { customRender: 'course_end_time' }
  }, {
    title: '购买日期',
    dataIndex: 'course_buy_time',
    scopedSlots: { customRender: 'course_buy_time' }
  }, {
    title: '销售人员',
    dataIndex: 'staff_name',
    scopedSlots: { customRender: 'staff_name' }
  }, {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
