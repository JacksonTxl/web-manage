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
      title: '教练级别',
      dataIndex: 'personal_checkin_num'
    },
    {
      title: '预约人姓名',
      dataIndex: 'personal_checkin_num'
    },
    {
      title: '签到人数',
      dataIndex: 'personal_consume_amount',
      scopedSlots: { customRender: 'personal_consume_amount' }
    },
    {
      title: '消费方式',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '消费价值（元）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    }
  ]
}
