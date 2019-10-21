export const columns = (vm: any) => {
  return [
    {
      title: '用户姓名',
      dataIndex: 'activity_name',
      scopedSlots: { customRender: 'activity_name' }
    },
    {
      title: '用户手机号',
      dataIndex: 'start_time',
      scopedSlots: { customRender: 'start_time' }
    },
    {
      title: '报名时间',
      dataIndex: 'end_time',
      scopedSlots: { customRender: 'end_time' }
    },
    {
      title: '票种',
      dataIndex: 'ticket_type_num',
      scopedSlots: { customRender: 'ticket_type_num' }
    },
    {
      title: '价格(元)',
      dataIndex: 'publish_time',
      scopedSlots: { customRender: 'publish_time' }
    },
    {
      title: '票号',
      dataIndex: 'total_people',
      scopedSlots: { customRender: 'total_people' }
    },
    {
      title: '状态',
      dataIndex: 'join_people',
      scopedSlots: { customRender: 'join_people' }
    },
    {
      title: '报名信息',
      dataIndex: 'sign_up',
      width: 140,
      fixed: 'right',
      scopedSlots: { customRender: 'sign_up' }
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
