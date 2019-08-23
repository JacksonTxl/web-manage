export const columns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: '教练姓名',
      dataIndex: 'member_card_avg'
    },
    {
      title: '所属部门',
      dataIndex: 'member_card_num'
    },
    {
      title: '上课节数（私）',
      dataIndex: 'personal_course_avg'
    },
    {
      title: '预约人数（私)',
      dataIndex: 'personal_course_num'
    },
    {
      title: '签到人数（私）',
      dataIndex: 'team_course_avg'
    },
    {
      title: '私教消课价值（元)',
      dataIndex: 'team_course_num'
    },
    {
      title: '上课节数（团）',
      dataIndex: 'deposit_card_avg'
    },
    {
      title: '排课人数（团）',
      dataIndex: 'deposit_card_num'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'package_course_avg'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'package_course_num'
    },
    {
      title: '团课消课价值（元）',
      dataIndex: 'shop_avg'
    }
  ]
}
