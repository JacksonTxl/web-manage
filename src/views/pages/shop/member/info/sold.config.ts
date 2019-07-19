export const classrecord = () => {
  return [
    {
      title: '课程类型',
      dataIndex: 'reserve_type',
      scopedSlots: { customRender: 'reserve_type' }
    },
    {
      title: '课程名称',
      dataIndex: 'course_name'
    },
    {
      title: '上课时间',
      dataIndex: 'start_time'
    },
    {
      title: '上课教练',
      dataIndex: 'coach_name'
    },
    {
      title: '预约人数',
      dataIndex: 'reserve_num'
    },
    {
      title: '预约状态',
      dataIndex: 'reserve_status'
    },
    {
      title: '签到状态',
      dataIndex: 'is_checkin',
      scopedSlots: { customRender: 'is_checkin' }
    },
    {
      title: '预约时间',
      dataIndex: 'reserve_time'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 150,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
export const admission = () => {
  return [
    {
      title: '入场门店',
      dataIndex: 'shop_name',
      key: 'shop_name'
    },
    {
      title: '入场时间',
      dataIndex: 'entrance_time',
      key: 'entrance_time'
    },
    {
      title: '离场时间',
      dataIndex: 'leave_time',
      key: 'leave_time'
    }
  ]
}
