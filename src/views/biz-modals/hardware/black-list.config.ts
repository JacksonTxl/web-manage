export const columns = (vm: any) => {
  return [
    {
      title: '昵称',
      dataIndex: 'user_name'
    },
    {
      title: '手机号码',
      dataIndex: 'mobile'
    },
    {
      title: '类型',
      dataIndex: 'user_type'
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
