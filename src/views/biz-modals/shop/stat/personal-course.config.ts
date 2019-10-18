export const columns = (vm: any) => {
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
      title: `${vm.$c('coach')}姓名`,
      dataIndex: 'coach_name'
    },
    {
      title: `${vm.$c('coach')}级别`,
      dataIndex: 'coach_level_name'
    },
    {
      title: '预约人数',
      dataIndex: 'reserved_num'
    },
    {
      title: '签到人数',
      dataIndex: 'checkin_num'
    }
  ]
}
