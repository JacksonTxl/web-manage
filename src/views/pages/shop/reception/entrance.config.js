export const columns = [
  {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '入场类型',
    dataIndex: 'entry_type',
    scopedSlots: { customRender: 'entry_type' }
  },
  {
    title: '入场时间',
    dataIndex: 'entry_time',
    scopedSlots: { customRender: 'entry_time' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
