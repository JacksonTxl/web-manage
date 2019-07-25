export const columns = () => {
  return [
    {
      title: '日期',
      dataIndex: 'stat_date'
    },
    {
      title: '总营收额(元)',
      dataIndex: 'total_amount'
    },
    {
      title: '会员卡营收(元)',
      dataIndex: 'member_card_amount'
    },
    {
      title: '私教课营收(元)',
      dataIndex: 'personal_course_amount'
    },
    {
      title: '团体课营收(元)',
      dataIndex: 'team_course_amount'
    },
    {
      title: '课程包营收(元)',
      dataIndex: 'package_course_amount'
    },
    {
      title: '云店营收(元)',
      dataIndex: 'shop_amount'
    },
    {
      title: '其它营收(元)',
      dataIndex: 'other_amount'
    }
  ]
}
