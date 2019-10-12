export const allColumns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      dataIndex: 'member_card_num',
      slots: { title: 'memberTitle' },
      scopedSlots: { customRender: 'member_card_num' }
    },
    {
      title: '会员卡购买金额（元）',
      dataIndex: 'member_card_amount'
    },
    {
      dataIndex: 'deposit_card_num',
      slots: { title: 'depositTitle' },
      scopedSlots: { customRender: 'deposit_card_num' }
    },
    {
      title: '储值卡购买金额（元）',
      dataIndex: 'deposit_card_amount'
    },
    {
      title: '私教购买节数',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' }
    },
    {
      title: '私教购买金额（元）',
      dataIndex: 'personal_course_amount'
    },
    {
      dataIndex: 'team_course_num',
      slots: { title: 'teamTitle' },
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '团课购买金额（元）',
      dataIndex: 'team_course_amount'
    },
    {
      title: '课程包购买节数',
      dataIndex: 'package_course_num'
    },
    {
      title: '课程包购买金额（元）',
      dataIndex: 'package_course_amount'
    },
    {
      dataIndex: 'total_course_num',
      slots: { title: 'totalTitle' },
      scopedSlots: { customRender: 'total_course_num' }
    },
    {
      dataIndex: 'other_amount',
      slots: { title: 'otherTitle' },
      scopedSlots: { customRender: 'other_amount' }
    },
    {
      dataIndex: 'performance_amount',
      slots: { title: 'performanceTitle' },
      scopedSlots: { customRender: 'performance_amount' }
    },
  ]
}
export const staffColumns = () => {
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
      slots: { title: 'memberTitle' },
      scopedSlots: { customRender: 'member_card_num' }
    },
    {
      title: '会员卡购买金额（元）',
      dataIndex: 'member_card_amount'
    },
    {
      dataIndex: 'deposit_card_num',
      slots: { title: 'depositTitle' },
      scopedSlots: { customRender: 'deposit_card_num' }
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
      dataIndex: 'personal_course_amount'
    },
    {
      dataIndex: 'team_course_num',
      slots: { title: 'teamTitle' },
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '团课购买金额（元）',
      dataIndex: 'team_course_amount'
    },
    {
      title: '课程包购买节数',
      dataIndex: 'package_course_num'
    },
    {
      title: '课程包购买金额（元）',
      dataIndex: 'package_course_amount'
    },
    {
      dataIndex: 'total_course_num',
      slots: { title: 'totalTitle' },
      scopedSlots: { customRender: 'total_course_num' }
    },
    {
      dataIndex: 'other_amount',
      slots: { title: 'otherTitle' },
      scopedSlots: { customRender: 'other_amount' }
    },
    {
      dataIndex: 'performance_amount',
      slots: { title: 'performanceTitle' },
      scopedSlots: { customRender: 'performance_amount' }
    },
  ]
}
