export const columns = () => {
  return [
    {
      title: '中奖用户姓名',
      dataIndex: 'prize_member_name'
    },
    {
      title: '中奖用户手机号',
      dataIndex: 'mobile'
    },
    {
      title: '活动名称',
      dataIndex: 'activity_name'
    },
    {
      title: '中奖时间',
      dataIndex: 'prize_time'
    },
    {
      title: '奖品名称',
      dataIndex: 'prize_name'
    },
    {
      title: '兑换码',
      dataIndex: 'code'
    },
    {
      title: '可用门店',
      dataIndex: 'shops'
    },
    {
      title: '兑换码状态',
      dataIndex: 'code_status_name'
    }
  ]
}
