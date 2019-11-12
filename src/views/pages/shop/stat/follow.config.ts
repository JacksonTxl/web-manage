export const dateColumns = (vm: any) => {
  return [
    {
      title: '日期',
      dataIndex: 'stat_date'
    },
    {
      title: '电话跟进数',
      dataIndex: 'total_amount',
      align: 'right'
    },
    {
      title: `微信跟进数`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      title: '客户到访跟进数',
      dataIndex: 'personal_course_amount',
      align: 'right'
    },
    {
      title: '上门拜访跟进数',
      dataIndex: 'team_course_amount',
      align: 'right'
    },
    {
      title: '邀约成功数',
      dataIndex: 'package_course_amount',
      align: 'right'
    },
    {
      title: '实际到访数',
      dataIndex: 'shop_amount',
      align: 'right'
    },
    {
      title: '签约数',
      dataIndex: 'other_amount',
      align: 'right'
    },
    {
      title: '购卡数',
      dataIndex: 'other_amount',
      align: 'right'
    }
  ]
}
export const staffColumns = (vm: any) => {
  return [
    {
      title: '员工',
      dataIndex: 'stat_date'
    },
    {
      title: '每日跟进总数',
      dataIndex: 'total_amount',
      align: 'right'
    },
    {
      title: '电话跟进数',
      dataIndex: 'total_amount',
      align: 'right'
    },
    {
      title: `微信跟进数`,
      dataIndex: 'member_card_amount',
      align: 'right'
    },
    {
      title: '客户到访跟进数',
      dataIndex: 'personal_course_amount',
      align: 'right'
    },
    {
      title: '上门拜访跟进数',
      dataIndex: 'team_course_amount',
      align: 'right'
    },
    {
      title: '已电话数',
      dataIndex: 'package_course_amount',
      align: 'right'
    },
    {
      title: '已邀约数',
      dataIndex: 'shop_amount',
      align: 'right'
    },
    {
      title: '实际到访数',
      dataIndex: 'other_amount',
      align: 'right'
    },
    {
      title: '已签到数',
      dataIndex: 'other_amount',
      align: 'right'
    },
    {
      title: '已购卡数',
      dataIndex: 'other_amount',
      align: 'right'
    }
  ]
}
