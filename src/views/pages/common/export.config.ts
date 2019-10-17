export const columns = () => [
  {
    title: '时间',
    dataIndex: 'operator_time',
    width: 250
  },
  {
    title: '导出来源',
    dataIndex: 'export_source',
    scopedSlots: {
      customRender: 'export_source'
    }
  },
  {
    title: '导出状态',
    dataIndex: 'operate_status',
    scopedSlots: {
      customRender: 'operate_status'
    }
  },
  {
    title: '导出数据',
    dataIndex: 'operate_type',
    scopedSlots: {
      customRender: 'operate_type'
    }
  },
  {
    title: '操作人',
    dataIndex: 'operator_name'
  },
  {
    title: '操作',
    key: 'action',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
