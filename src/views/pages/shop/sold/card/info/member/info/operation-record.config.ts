export const columns = () => [
  {
    title: '操作时间',
    dataIndex: 'operate_time'
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
    width: '120px',
    scopedSlots: { customRender: 'operate_object' }
  },
  {
    title: '操作前',
    dataIndex: 'before_operate',
    width: '180px',
    scopedSlots: { customRender: 'before_operate' }
  },
  {
    title: '操作后',
    dataIndex: 'after_operate',
    width: '180px',
    scopedSlots: { customRender: 'after_operate' }
  },
  {
    title: '操作人',
    dataIndex: 'operater_name'
  },
  {
    title: '备注',
    dataIndex: 'description'
  }
]
