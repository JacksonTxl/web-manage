export const allColumns = (vm: any) => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      dataIndex: 'member_card_num',
      titleTotal: '会籍卡成单数',
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
      titleTotal: '储值卡成单数',
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
    //   align: 'right',
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
      dataIndex: 'total_course_num',
      titleTotal: '总购课节数 ',
      align: 'right',
      slots: { title: 'totalTitle' }
    },
    {
      dataIndex: 'other_amount',
      align: 'right',
      titleTotal: '其它销售金额（元） ',
      slots: { title: 'otherTitle' }
    },
    {
      dataIndex: 'performance_amount',
      align: 'right',
      titleTotal: '总销售业绩（元) ',
      slots: { title: 'performanceTitle' },
      scopedSlots: { customRender: 'performance_amount' }
    }
  ]
}
export const staffColumns = (vm: any) => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      title: '员工姓名',
      fixed: 'left',
      width: '150px',
      dataIndex: 'staff_name'
    },
    {
      title: '所属部门',
      fixed: 'left',
      width: '150px',
      dataIndex: 'department_name'
    },
    {
      dataIndex: 'member_card_num',
      align: 'right',
      titleTotal: '会籍卡成单数',
      slots: { title: 'memberTitle' }
    },
    {
      title: `${vm.$c('member_card')}购买金额（元）`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      dataIndex: 'deposit_card_num',
      titleTotal: '储值卡成单数',
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
    //   align: 'right',
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
      dataIndex: 'total_course_num',
      align: 'right',
      slots: { title: 'totalTitle' },
      titleTotal: '总购课节数 '
    },
    {
      dataIndex: 'other_amount',
      align: 'right',
      slots: { title: 'otherTitle' },
      titleTotal: '其它销售金额（元） '
    },
    {
      dataIndex: 'performance_amount',
      align: 'right',
      slots: { title: 'performanceTitle' },
      titleTotal: '总销售业绩（元)',
      scopedSlots: { customRender: 'performance_amount' }
    }
  ]
}
