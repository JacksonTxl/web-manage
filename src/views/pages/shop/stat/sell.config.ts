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
      align: 'right',
      slots: { title: 'memberTitle' },
      scopedSlots: { customRender: 'member_card_num' }
    },
    {
      title: `${vm.$c('member_card')}购买金额（元）`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      dataIndex: 'deposit_card_num',
      align: 'right',
      slots: { title: 'depositTitle' },
      scopedSlots: { customRender: 'deposit_card_num' }
    },
    {
      title: '储值卡购买金额（元）',
      dataIndex: 'deposit_card_amount',
      align: 'right'
    },
    {
      title: '私教购买节数',
      dataIndex: 'personal_course_num',
      align: 'right',
      scopedSlots: { customRender: 'personal_course_num' }
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
      scopedSlots: { customRender: 'total_course_num' }
    },
    {
      dataIndex: 'other_amount',
      align: 'right',
      slots: { title: 'otherTitle' },
      scopedSlots: { customRender: 'other_amount' }
    },
    {
      dataIndex: 'performance_amount',
      align: 'right',
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
      slots: { title: 'memberTitle' },
      scopedSlots: { customRender: 'member_card_num' }
    },
    {
      title: `${vm.$c('member_card')}购买金额（元）`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      dataIndex: 'deposit_card_num',
      align: 'right',
      slots: { title: 'depositTitle' },
      scopedSlots: { customRender: 'deposit_card_num' }
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
      scopedSlots: { customRender: 'total_course_num' }
    },
    {
      dataIndex: 'other_amount',
      align: 'right',
      slots: { title: 'otherTitle' },
      scopedSlots: { customRender: 'other_amount' }
    },
    {
      dataIndex: 'performance_amount',
      align: 'right',
      slots: { title: 'performanceTitle' },
      scopedSlots: { customRender: 'performance_amount' }
    }
  ]
}
