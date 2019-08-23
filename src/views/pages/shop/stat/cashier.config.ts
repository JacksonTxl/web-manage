export const columns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: '收入流水总额(元)',
      dataIndex: 'member_card_avg'
    },
    {
      title: '线上微信(元)',
      dataIndex: 'member_card_num'
    },
    {
      title: '线下微信(元)',
      dataIndex: 'personal_course_avg'
    },
    {
      title: '线下支付宝(元)',
      dataIndex: 'personal_course_num'
    },
    {
      title: '线下POS(元)',
      dataIndex: 'team_course_avg'
    },
    {
      title: '现金(元)',
      dataIndex: 'team_course_num'
    },
    {
      title: '银行转账(元)',
      dataIndex: 'deposit_card_avg'
    },
    {
      title: '内部结转(元)',
      dataIndex: 'deposit_card_num'
    },
    {
      title: '其它(元)',
      dataIndex: 'package_course_avg'
    }
  ]
}
