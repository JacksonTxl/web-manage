export const columns = () => {
  return [
    {
      title: '用户名称',
      dataIndex: 'user_name',
      scopedSlots: { customRender: 'user_name' }
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '用户身份',
      dataIndex: 'user_type'
    },
    {
      title: '入场凭证',
      dataIndex: 'entry_proof'
    },
    {
      title: '入场类型',
      dataIndex: 'entry_type'
    },
    {
      title: '入场时间',
      dataIndex: 'entry_time'
    },
    {
      title: '入场区域',
      dataIndex: 'entry_area'
    },
    {
      title: '入场方式',
      dataIndex: 'entry_from'
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
      dataIndex: 'leave_from'
    },
    {
      title: '在场时间',
      dataIndex: 'total_time'
    }
  ]
}
