export const columns = () => {
  return [
    {
      title: '发送时间',
      dataIndex: 'updated_time',
      width: 180
    },
    {
      title: '状态',

      scopedSlots: { customRender: 'send_status' }
    },
    {
      title: '通知对象',
      scopedSlots: { customRender: 'notify_type' }
    },
    {
      title: '短信模板',
      scopedSlots: { customRender: 'notify_sub_type' }
    },
    {
      title: '姓名',
      dataIndex: 'user_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '内容',
      dataIndex: 'content'
    }
  ]
}
