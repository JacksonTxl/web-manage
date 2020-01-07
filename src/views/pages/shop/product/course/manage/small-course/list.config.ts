export const columns = (vm: any) => {
  return [
    {
      title: `${vm.$c('small_course')}名称`,
      dataIndex: 'course_name',
      width: 160,
      fixed: 'left'
    },
    {
      title: '类型',
      dataIndex: 'small_course_type',
      width: 150,
      scopedSlots: { customRender: 'small_course_type' }
    },
    {
      title: '排课情况',
      width: 150,
      scopedSlots: { customRender: 'course_arrangement' }
    },
    {
      title: '报名时间',
      dataIndex: 'apply_time',
      width: 250
    },
    {
      title: '开班时间',
      dataIndex: 'course_time',
      width: 250
    },
    {
      title: '售价',
      dataIndex: 'sales_price',
      width: 150,
      scopedSlots: { customRender: 'sales_price' }
    },
    {
      title: '报名人数',
      width: 100,
      dataIndex: 'apply_num'
    },
    {
      // title: '成班条件',
      slots: { title: 'class_conditions' },
      width: 100,
      dataIndex: 'class_conditions'
    },
    {
      // title: '状态',
      slots: { title: 'course_status' },
      width: 100,
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
      width: 100,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
