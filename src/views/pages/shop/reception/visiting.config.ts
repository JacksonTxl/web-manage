export const columns = () => {
  return [
    {
      title: '预约时间',
      dataIndex: 'start_time',
      align: 'right',
      scopedSlots: { customRender: 'start_time' }
    },
    {
      title: '预约人',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      scopedSlots: { customRender: 'mobile' }
    },
    {
      title: '预约类型',
      dataIndex: 'reserve_type',
      scopedSlots: { customRender: 'reserve_type' }
    },
    {
      title: '预约状态',
      dataIndex: 'reserve_status',
      scopedSlots: { customRender: 'reserve_status' }
    },
    {
      title: '接待人',
      dataIndex: 'receptionist_name',
      scopedSlots: { customRender: 'receptionist_name' }
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
