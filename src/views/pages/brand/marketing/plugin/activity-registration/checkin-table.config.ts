export const columns = (vm: any) => {
  return [
    {
      title: '票号',
      dataIndex: 'id',
      scopedSlots: { customRender: 'id' }
    },
    {
      title: '用户姓名',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '用户手机号',
      dataIndex: 'member_mobile',
      scopedSlots: { customRender: 'member_mobile' }
    },
    {
      title: '活动标题',
      dataIndex: 'activity_name',
      scopedSlots: { customRender: 'activity_name' }
    },
    {
      title: '票种',
      dataIndex: 'ticket_name',
      scopedSlots: { customRender: 'ticket_name' }
    },
    {
      title: '价格(元)',
      dataIndex: 'ticket_price',
      scopedSlots: { customRender: 'ticket_price' }
    },
    {
      title: '状态',
      dataIndex: 'ticket_status',
      scopedSlots: { customRender: 'ticket_status' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
