export const dateColumns = (vm: any) => {
  return [
    {
      title: '上课时间',
      dataIndex: 'conflict_time',
      width: '190px'
    },
    {
      title: '上课场地',
      dataIndex: 'court_name',
      width: '160px'
    },
    {
      title: '上课老师',
      dataIndex: 'coach_name',
      width: '120px'
    },
    {
      title: '课程',
      dataIndex: 'course_name'
    }
  ]
}
