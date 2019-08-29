export const columns = (vm: any) => {
  return [
    {
      title: '区域名称',
      dataIndex: 'area_name'
    },
    {
      title: '区域类型',
      dataIndex: 'area_type'
    },
    {
      title: '通行人员',
      dataIndex: 'people_type'
    },
    // {
    //   title: '允许进入时段',
    //   dataIndex: 'allow_time'
    // },
    {
      title: '离场限制',
      scopedSlots: { customRender: 'leave_limit' }
    },
    // {
    //   title: '是否记录入离场',
    //   dataIndex: 'is_leave'
    // },
    {
      title: '支持入场签课',
      dataIndex: 'is_checkin'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
export const ruleColumns = (vm: any) => {
  return [
    {
      title: '入场凭证',
      dataIndex: 'proof'
    },
    {
      title: '优先级',
      dataIndex: 'level'
    }
  ]
}
