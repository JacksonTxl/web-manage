export const columns = () => {
  return [
    {
      title: '活动名称',
      dataIndex: 'activity_name'
    },
    {
      title: '活动时间',
      dataIndex: 'activity_end_time'
    },
    {
      title: '参与用户',
      dataIndex: 'card_type'
    },
    {
      title: '参与人数',
      scopedSlots: { customRender: 'join_num' }
    },
    {
      title: '中奖人数',
      scopedSlots: { customRender: 'prize_num' }
    },
    {
      title: '活动状态',
      dataIndex: 'activity_status_name'
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
