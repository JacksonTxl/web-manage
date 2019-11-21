export const columns = () => {
  return [
    {
      title: '时间',
      dataIndex: 'task_time'
    },
    {
      title: '任务来源',
      dataIndex: 'task_source',
      scopedSlots: { customRender: 'task_source' }
    },
    {
      title: '所属模块',
      dataIndex: 'task_type'
    },
    {
      title: '任务状态',
      dataIndex: 'task_status',
      scopedSlots: { customRender: 'task_status' }
    },
    {
      title: '任务名称',
      dataIndex: 'task_name'
    },
    {
      title: '总数',
      dataIndex: 'total_num',
      scopedSlots: { customRender: 'total_num' }
    },
    {
      title: '成功数',
      dataIndex: 'success_num',
      scopedSlots: { customRender: 'success_num' }
    },
    {
      title: '失败数',
      dataIndex: 'fail_num',
      scopedSlots: { customRender: 'fail_num' }
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
