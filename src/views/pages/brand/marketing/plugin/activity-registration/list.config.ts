export const columns = (vm: any) => {
  return [
    {
      title: '活动名称',
      dataIndex: 'activity_name',
      scopedSlots: { customRender: 'activity_name' }
    },
    {
      title: '活动开始时间',
      dataIndex: 'start_time',
      scopedSlots: { customRender: 'start_time' }
    },
    {
      title: '活动结束时间',
      dataIndex: 'end_time',
      scopedSlots: { customRender: 'end_time' }
    },
    {
      title: '票种数量',
      dataIndex: 'ticket_type_num',
      scopedSlots: { customRender: 'ticket_type_num' }
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      scopedSlots: { customRender: 'publish_time' }
    },
    {
      title: '活动总人数',
      dataIndex: 'total_people',
      scopedSlots: { customRender: 'total_people' }
    },
    {
      title: '活动已报名人数',
      dataIndex: 'join_people',
      scopedSlots: { customRender: 'join_people' }
    },
    {
      title: '活动状态',
      dataIndex: 'activity_status',
      align: 'right',
      scopedSlots: { customRender: 'activity_status' }
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
