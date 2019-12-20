export const columns = (vm: any) => {
  return [
    {
      title: '小班课名称',
      dataIndex: 'category_name'
    },
    {
      title: '类型',
      dataIndex: 'small_course_type'
    },
    {
      title: '排课情况',
      align: 'right',
      scopedSlots: { customRender: 'course_arrangement' }
    },
    {
      title: '报名时间',
      align: 'right',
      dataIndex: 'apply_time'
    },
    {
      title: '开班时间',
      align: 'right',
      dataIndex: 'course_time'
    },
    {
      title: '售价',
      align: 'right',
      dataIndex: 'sales_price'
    },
    {
      title: '报名人数',
      align: 'right',
      dataIndex: 'apply_num'
    },
    {
      title: '成班条件',
      align: 'right',
      dataIndex: 'class_conditions'
    },
    {
      title: '状态',
      align: 'right',
      dataIndex: 'course_status'
    },
    {
      title: '负责人',
      align: 'right',
      dataIndex: 'charge_person'
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
