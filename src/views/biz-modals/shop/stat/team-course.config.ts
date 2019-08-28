export const columns = () => {
  return [
    {
      title: '课程名称',
      dataIndex: 'stat_date'
    },
    {
      title: '上课时间',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' }
    },
    {
      title: '教练姓名',
      dataIndex: 'personal_reserved_num'
    },
    {
      title: '预约人数',
      dataIndex: 'personal_consume_amount',
      scopedSlots: { customRender: 'personal_consume_amount' }
    },
    {
      title: '签到人数',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    }
  ]
}
