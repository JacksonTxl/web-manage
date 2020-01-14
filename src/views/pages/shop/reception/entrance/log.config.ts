export const columns = () => {
  return [
    {
      title: '用户名称',
      dataIndex: 'user_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      scopedSlots: { customRender: 'mobile' }
    },
    {
      title: '用户身份',
      dataIndex: 'user_type'
    },
    {
      title: '入场凭证',
      dataIndex: 'entry_proof',
      scopedSlots: { customRender: 'entry_proof' }
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
      title: '入场区域',
      dataIndex: 'entry_area',
      scopedSlots: { customRender: 'entry_area' }
    },
    {
      title: '入场方式',
      dataIndex: 'entry_from',
      scopedSlots: { customRender: 'entry_from' }
    },
    {
      title: '离场时间',
      dataIndex: 'leave_time'
    },
    {
      title: '离场区域',
      dataIndex: 'leave_area'
    },
    {
      title: '离场方式',
      dataIndex: 'leave_from',
      scopedSlots: { customRender: 'leave_from' }
    },
    {
      title: '在场时间',
      dataIndex: 'total_time',
      scopedSlots: { customRender: 'total_time' }
    }
  ]
}
