export const columns = () => {
  return [
    {
      title: '时间',
      dataIndex: 'task_time',
      scopedSlots: { customRender: 'task_time' }
    },
    {
      title: '任务来源',
      dataIndex: 'task_source',
      scopedSlots: { customRender: 'task_source' }
    },
    {
      title: '所属模块',
      dataIndex: 'task_source',
      scopedSlots: { customRender: 'task_source' }
    },
    {
      title: '任务状态',
      dataIndex: 'task_status',
      scopedSlots: { customRender: 'task_status' }
    },
    {
      title: '任务名称',
      dataIndex: 'shop_status',
      width: 120,
      scopedSlots: { customRender: 'shop_status' }
    },
    {
      title: '总数',
      dataIndex: 'total_num',
      width: 120,
      scopedSlots: { customRender: 'total_num' }
    },
    {
      title: '成功数',
      dataIndex: 'success_num',
      width: 220,
      scopedSlots: { customRender: 'success_num' }
    },
    {
      title: '失败数',
      dataIndex: 'fail_num',
      width: 220,
      scopedSlots: { customRender: 'fail_num' }
    },
    {
      title: '操作人',
      dataIndex: 'operator_name',
      width: 220,
      scopedSlots: { customRender: 'operator_name' }
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
