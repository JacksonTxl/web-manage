export const columns = () => {
  return [
    {
      title: '预约时间',
      dataIndex: 'reserve_time',
      scopedSlots: { customRender: 'reserve_time' }
    },
    {
      title: '预约用户',
      dataIndex: 'member',
      scopedSlots: { customRender: 'member' }
    },
    {
      title: '预约用户手机号',
      dataIndex: 'mobile',
      scopedSlots: { customRender: 'mobile' }
    },
    {
      title: '预约类型',
      dataIndex: 'reserve_type',
      scopedSlots: { customRender: 'reserve_type' }
    },
    {
      title: '预约课程',
      dataIndex: 'reserve_course_name',
      scopedSlots: { customRender: 'reserve_course_name' }
    },
    {
      title: '预约状态',
      dataIndex: 'reserve_status',
      scopedSlots: { customRender: 'reserve_status' }
    },
    {
      title: '接待人/上课教练',
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
