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
      title: '可约人数',
      dataIndex: 'can_reserve_num'
    },
    {
      title: '预约人数',
      dataIndex: 'reserve_num'
    },
    {
      title: '签到人数',
      dataIndex: 'checkin_num'
    }
  ]
}
