// 合计列
export const totalColumns = (vm: any) => [
  {
    dataIndex: 'member_card_num',
    title: '会籍卡成单数'
  },
  {
    title: `${vm.$c('member_card')}购买金额（元）`,
    dataIndex: 'member_card_amount'
  },
  {
    dataIndex: 'deposit_card_num',
    title: '储值卡成单数'
  },
  {
    title: '储值卡购买金额（元）',
    dataIndex: 'deposit_card_amount'
  },
  {
    title: '私教购买节数',
    dataIndex: 'personal_course_num'
  },
  {
    title: '私教购买金额（元）',
    dataIndex: 'personal_course_amount',
    align: 'right'
  },
  {
    title: '课程包购买节数',
    dataIndex: 'package_course_num'
  },
  {
    title: '课程包购买金额（元）',
    dataIndex: 'package_course_amount',
    align: 'right'
  },
  {
    title: `${vm.$c('small_course')}购买节数`,
    dataIndex: 'small_course_num'
  },
  {
    title: `${vm.$c('small_course')}购买金额（元)`,
    dataIndex: 'small_course_amount'
  },
  {
    dataIndex: 'total_course_num',
    title: '总购课节数 '
  },
  {
    dataIndex: 'other_amount',
    title: '其它销售金额（元） '
  },
  {
    dataIndex: 'performance_amount',
    title: '总销售业绩（元) ',
    scopedSlots: { customRender: 'performance_amount' }
  }
]

// 表格列
export const columns = (vm: any) => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      dataIndex: 'member_card_num',
      align: 'right',
      slots: { title: 'memberTitle' }
    },
    {
      title: `${vm.$c('member_card')}购买金额（元）`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      dataIndex: 'deposit_card_num',
      align: 'right',
      slots: { title: 'depositTitle' }
    },
    {
      title: '储值卡购买金额（元）',
      dataIndex: 'deposit_card_amount',
      align: 'right'
    },
    {
      title: '私教购买节数',
      dataIndex: 'personal_course_num',
      align: 'right'
    },
    {
      title: '私教购买金额（元）',
      dataIndex: 'personal_course_amount',
      align: 'right'
    },
    // {
    //   dataIndex: 'team_course_num',
    //   align: 'right'
    //   slots: { title: 'teamTitle' },
    //   scopedSlots: { customRender: 'team_course_num' }
    // },
    // {
    //   title: '团课购买金额（元）',
    //   dataIndex: 'team_course_amount',
    //   align: 'right'
    // },
    {
      title: '课程包购买节数',
      dataIndex: 'package_course_num',
      align: 'right'
    },
    {
      title: '课程包购买金额（元）',
      dataIndex: 'package_course_amount',
      align: 'right'
    },
    {
      title: `${vm.$c('small_course')}购买节数`,
      dataIndex: 'small_course_num',
      align: 'right'
    },
    {
      title: `${vm.$c('small_course')}购买金额（元)`,
      dataIndex: 'small_course_amount',
      align: 'right'
    },
    {
      dataIndex: 'total_course_num',
      align: 'right',
      slots: { title: 'totalTitle' }
    },
    {
      dataIndex: 'other_amount',
      align: 'right',
      slots: { title: 'otherTitle' }
    },
    {
      dataIndex: 'performance_amount',
      align: 'right',
      slots: { title: 'performanceTitle' },
      scopedSlots: { customRender: 'performance_amount' }
    }
  ]
}
