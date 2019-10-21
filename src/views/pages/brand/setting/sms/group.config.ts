export const recordColumns = () => {
  return [
    {
      title: '发送时间',
      dataIndex: 'send_time'
    },
    {
      title: '发送内容',
      dataIndex: 'content'
    },
    {
      title: '接受人',
      dataIndex: 'received_user'
    },
    {
      title: '接收人数',
      dataIndex: 'received_count'
    },
    {
      title: '发送状态',
      dataIndex: 'send_status_text'
    },
    {
      title: '操作人',
      dataIndex: 'operator'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
export const templateColumns = () => {
  return [
    {
      title: '模版名称',
      dataIndex: 'title'
    },
    {
      title: '模版内容',
      dataIndex: 'content'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
