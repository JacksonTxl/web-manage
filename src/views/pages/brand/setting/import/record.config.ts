export const columns = () => {
  return [
    {
      title: '时间',
      dataIndex: 'import_time'
    },
    {
      title: '导入状态',
      dataIndex: 'excel_operate_status',
      scopedSlots: { customRender: 'excel_operate_status' }
    },
    {
      title: '导入数据类型',
      dataIndex: 'import_type',
      scopedSlots: { customRender: 'import_type' }
    },
    {
      title: '新增数据',
      dataIndex: 'input_created_num'
    },
    {
      title: '更新数据',
      dataIndex: 'input_updated_num'
    },
    {
      title: '错误数据',
      dataIndex: 'input_error_num',
      scopedSlots: { customRender: 'input_error_num' }
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    }
  ]
}
