export const columns = () => [
  {
    title: '标签名称',
    dataIndex: 'tag_name'
  },
  {
    title: '用户数量',
    dataIndex: 'user_number'
  },
  {
    title: '创建人',
    dataIndex: 'operator_name'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time'
  },
  {
    title: '操作',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
