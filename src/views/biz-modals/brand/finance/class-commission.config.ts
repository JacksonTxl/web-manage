export const columns = (vm: any) => {
  const columns_num = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      width: '200px'
    },
    {
      title: '上课时间',
      dataIndex: 'course_time',
      width: '200px'
    },
    {
      title: '预约人数',
      dataIndex: 'reserved_num',
      width: '200px'
    },
    {
      title: '签到人数',
      dataIndex: 'checkin_num',
      width: '200px'
    }
  ]
  const columns_percent = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      width: '200px'
    },
    {
      title: '上课时间',
      dataIndex: 'course_time',
      width: '200px'
    },
    {
      title: '签到时间',
      dataIndex: 'checkin_time',
      width: '200px'
    },
    {
      title: '预约人姓名',
      dataIndex: 'reserve_name',
      width: '200px'
    },
    {
      title: '签到人数',
      dataIndex: 'checkin_num',
      width: '200px'
    },
    {
      title: '消费方式',
      dataIndex: 'consume_type',
      width: '200px'
    },
    {
      title: '消课价值',
      dataIndex: 'consume_amount',
      width: '200px'
    }
  ]
  if (vm.info && vm.info.royalty_mode === 1) {
    return columns_num
  }
  return columns_percent
}
