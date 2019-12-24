export const columns = () => {
  return [
    {
      title: '适用范围',
      dataIndex: 'setting_name'
    },
    {
      title: '标记课程数',
      dataIndex: 'used_number'
    },
    {
      title: '创建人',
      dataIndex: 'operator_name'
    },
    {
      title: '最后修改时间',
      dataIndex: 'updated_time'
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
