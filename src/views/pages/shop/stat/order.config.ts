export const columns = (vm: any) => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: `${vm.$c('member_card')}客单价(元)`,
      dataIndex: 'member_card_avg',

      align: 'right'
    },
    {
      title: `${vm.$c('member_card')}成单数`,
      dataIndex: 'member_card_num',
      align: 'right'
    },
    {
      title: '私教课客单价(元)',
      dataIndex: 'personal_course_avg',

      align: 'right'
    },
    {
      title: '私教课成单数',
      dataIndex: 'personal_course_num',
      align: 'right'
    },
    {
      title: '团体课客单价(元)',

      dataIndex: 'team_course_avg',
      align: 'right'
    },
    {
      title: '团体课成单数',
      dataIndex: 'team_course_num',
      align: 'right'
    },
    {
      title: '储值卡客单价(元)',

      dataIndex: 'deposit_card_avg',
      align: 'right'
    },
    {
      title: '储值卡成单数',
      dataIndex: 'deposit_card_num',
      align: 'right'
    },
    {
      title: '课程包客单价(元)',
      dataIndex: 'package_course_avg',
      align: 'right'
    },
    {
      title: '课程包成单数',
      dataIndex: 'package_course_num',
      align: 'right'
    },
    {
      title: '云店客单价(元)',

      dataIndex: 'shop_avg',
      align: 'right'
    },
    {
      title: '云店成单数',
      dataIndex: 'shop_num',
      align: 'right'
    }
  ]
}
