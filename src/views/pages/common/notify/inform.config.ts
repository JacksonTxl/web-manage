export const columns = () => {
  return [
    {
      title: '发送时间',
      dataIndex: 'send_time',
      width: 250
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      scopedSlots: { customRender: 'notify_type' },
      width: 250
    },
    {
      title: '二级分类',
      dataIndex: 'sub_notify_type',
      scopedSlots: { customRender: 'sub_notify_type' },
      width: 250
    },
    {
      title: '门店',
      dataIndex: 'shop_name',
      width: 250
    },
    {
      title: '内容',
      dataIndex: 'content',
      scopedSlots: { customRender: 'content' },
      width: 250
    },
    {
      title: '操作',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' },
      width: 80
    }
  ]
}
