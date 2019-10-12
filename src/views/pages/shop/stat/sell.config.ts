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
      dataIndex: 'new_member_amount'
    },
    {
      dataIndex: 'deposit_card_num',
      slots: { title: 'memberTitle' },
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
      title: '团课购买节数',
      dataIndex: 'team_course_num'
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
      title: '总购课节数',
      dataIndex: 'total_course_num'
    },
    {
      title: '其它销售金额（元）',
      dataIndex: 'other_amount'
    },
    {
      title: '总销售业绩（元）',
      dataIndex: 'performance_amount'
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
      title: '新入会成单数',
      dataIndex: 'member_card_num',
      scopedSlots: { customRender: 'member_card_num' }
    },
    {
      title: '新入会金额（元）',
      dataIndex: 'new_member_amount'
    },
    {
      title: '续会成单数',
      dataIndex: 'deposit_card_num'
    },
    {
      title: '续会金额（元）',
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
      title: '团课购买节数',
      dataIndex: 'team_course_num'
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
      title: '总购课节数',
      dataIndex: 'total_course_num'
    },
    {
      title: '其它销售金额（元）',
      dataIndex: 'other_amount'
    },
    {
      title: '总销售业绩（元）',
      dataIndex: 'performance_amount'
    }
  ]
}
