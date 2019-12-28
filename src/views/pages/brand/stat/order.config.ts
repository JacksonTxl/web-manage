export const columns = (vm: any) => [
  {
    title: '日期',
    dataIndex: 'stat_date',
    fixed: 'left',
    width: 140
  },
  {
    title: `${vm.$c('member_card')}客单价(元)`,
    align: 'right',
    dataIndex: 'member_card_avg'
  },
  {
    title: `${vm.$c('member_card')}成单数`,
    align: 'right',
    dataIndex: 'member_card_num'
    // scopedSlots: { customRender: 'image_face' }
  },
  {
    title: '私教课客单价(元)',
    align: 'right',
    dataIndex: 'personal_course_avg'
  },
  {
    title: '私教课成单数',
    align: 'right',
    dataIndex: 'personal_course_num'
  },
  {
    title: '团体课客单价(元)',
    align: 'right',
    dataIndex: 'team_course_avg'
  },
  {
    title: '团体课成单数',
    align: 'right',
    dataIndex: 'team_course_num'
  },
  {
    title: '储值卡客单价(元)',
    align: 'right',
    dataIndex: 'deposit_card_avg'
  },
  {
    title: '储值卡成单数',
    align: 'right',
    dataIndex: 'deposit_card_num'
  },
  {
    title: '课程包客单价(元)',
    align: 'right',
    dataIndex: 'package_course_avg'
  },
  {
    title: '课程包成单数',
    align: 'right',
    dataIndex: 'package_course_num'
  },
  {
    title: `${vm.$c('small_course')}客单价(元)`,
    align: 'right',
    dataIndex: 'small_course_avg'
  },
  {
    title: `${vm.$c('small_course')}成单数`,
    align: 'right',
    dataIndex: 'small_course_num'
  },
  {
    title: '云店订单客单价(元)',
    align: 'right',
    dataIndex: 'shop_avg'
  },
  {
    title: '云店成单数',
    align: 'right',
    dataIndex: 'shop_num'
  }
]
