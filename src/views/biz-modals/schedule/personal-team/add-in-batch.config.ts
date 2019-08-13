export const columns = (vm: any) => {
  return [
    {
      dataIndex: 'start_time',
      slots: { title: 'startTimeTitle' },
      scopedSlots: { customRender: 'start_time' }
    },
    {
      dataIndex: 'course_id',
      slots: { title: 'courseIdTitle' },
      scopedSlots: { customRender: 'course_id' }
    },
    {
      dataIndex: 'coach_id',
      slots: { title: 'coachIdTitle' },
      scopedSlots: { customRender: 'coach_id' }
    },
    {
      dataIndex: 'limit_num',
      slots: { title: 'limitNumTitle' },
      scopedSlots: { customRender: 'limit_num' }
    },
    {
      dataIndex: 'course_fee',
      slots: { title: 'courseFeeTitle' },
      scopedSlots: { customRender: 'course_fee' }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { title: 'courseFeeTitle' },
      scopedSlots: { customRender: 'operation' }
    }
  ]
}
