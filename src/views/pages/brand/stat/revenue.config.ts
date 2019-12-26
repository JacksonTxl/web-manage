export const columns = (vm: any) => [
  {
    title: '日期',
    dataIndex: 'stat_date',
    fixed: 'left',
    width: 140
  },
  {
    title: '总营收额(元)',
    align: 'right',
    dataIndex: 'total_amount'
  },
  {
    title: `${vm.$c('member_card')}营收(元)`,
    align: 'right',
    dataIndex: 'member_card_amount'
    // scopedSlots: { customRender: 'image_face' }
  },
  {
    title: '私教课营收(元)',
    align: 'right',
    dataIndex: 'personal_course_amount'
  },
  {
    title: '团体课营收(元)',
    align: 'right',
    dataIndex: 'team_course_amount'
  },
  {
    title: '小班课营收(元)',
    align: 'right',
    dataIndex: 'small_course_amount'
  },
  {
    title: '课程包营收(元)',
    align: 'right',
    dataIndex: 'package_course_amount'
  },
  {
    title: '云店营收(元)',
    align: 'right',
    dataIndex: 'shop_amount'
  },
  {
    title: '其他营收(元)',
    align: 'right',
    dataIndex: 'other_amount'
  }
]
