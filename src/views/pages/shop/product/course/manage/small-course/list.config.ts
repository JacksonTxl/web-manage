export const columns = (vm: any) => {
  return [
    {
      title: `${vm.$c('small_course')}名称`,
      dataIndex: 'course_name',
      fixed: 'left',
      width: 160
    },
    {
      title: '类型',
      dataIndex: 'small_course_type',
      scopedSlots: { customRender: 'small_course_type' }
    },
    {
      title: '排课情况',
      scopedSlots: { customRender: 'course_arrangement' }
    },
    {
      title: '报名时间',
      dataIndex: 'apply_time',
      width: 200
    },
    {
      title: '开班时间',
      dataIndex: 'course_time',
      width: 200
    },
    {
      title: '售价',
      dataIndex: 'sales_price',
      scopedSlots: { customRender: 'sales_price' }
    },
    {
      title: '报名人数',
      dataIndex: 'apply_num'
    },
    {
      // title: '成班条件',
      slots: { title: 'class_conditions' },
      dataIndex: 'class_conditions'
    },
    {
      // title: '状态',
      slots: { title: 'course_status' },
      scopedSlots: { customRender: 'course_status' }
    },
    {
      title: '负责人',
      dataIndex: 'charge_person',
      width: 150
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 160,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
