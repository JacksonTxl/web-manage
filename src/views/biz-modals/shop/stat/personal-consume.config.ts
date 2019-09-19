export const columns = () => {
  return [
    {
      title: '课程名称',
      dataIndex: 'course_name'
    },
    {
      title: '上课时间',
      dataIndex: 'course_time'
    },
    {
      title: '教练姓名',
      dataIndex: 'coach_name'
    },
    {
      title: '教练级别',
      dataIndex: 'coach_level'
    },
    {
      title: '预约人姓名',
      dataIndex: 'reserved_name'
    },
    {
      title: '签到人数',
      dataIndex: 'checkin_num'
    },
    {
      title: '消费方式',
      dataIndex: 'amount_type'
    },
    {
      title: '消课价值（元）',
      dataIndex: 'consume_amount'
    }
  ]
}
