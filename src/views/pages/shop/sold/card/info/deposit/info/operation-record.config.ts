export const columns = () => [
  {
    title: '操作时间',
    dataIndex: 'operation_time'
  },
  {
    title: '操作来源',
    dataIndex: 'operate_source_name'
  },
  {
    title: '操作类型',
    dataIndex: 'operate_name'
  },
  {
    title: '操作对象',
    dataIndex: 'operate_object',
    scopedSlots: { customRender: 'operate_object' }
  },
  {
    title: '操作前',
    dataIndex: 'before_operate',
    scopedSlots: { customRender: 'before_operate' }
  },
  {
    title: '操作后',
    dataIndex: 'after_operate',
    scopedSlots: { customRender: 'after_operate' }
  },
  {
    title: '操作人',
    dataIndex: 'operator'
  },
  {
    title: '备注',
    dataIndex: 'description'
  }
]
