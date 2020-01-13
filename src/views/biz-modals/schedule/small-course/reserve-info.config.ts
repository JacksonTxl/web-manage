export const columns = (vm: any) => {
  return [
    {
      title: '会员姓名',
      dataIndex: 'member',
      width: '20%',
      scopedSlots: { customRender: 'member' }
    },
    {
      title: '消费方式',
      dataIndex: 'consume_type',
      scopedSlots: { customRender: 'consume_type' }
    },
    {
      title: '签到状态',
      dataIndex: 'is_checkin',
      width: '20%'
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
