export const columns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: '收入流水总额(元)',
      dataIndex: 'total_amount'
    },
    {
      title: '线上微信(元)',
      dataIndex: 'online_wechat_amount'
    },
    {
      title: '线下微信(元)',
      dataIndex: 'offline_wechat_amount'
    },
    {
      title: '线下支付宝(元)',
      dataIndex: 'offline_ailipay_amount'
    },
    {
      title: '线下POS(元)',
      dataIndex: 'offline_pos_amount'
    },
    {
      title: '现金(元)',
      dataIndex: 'cash_amount'
    },
    {
      title: '银行转账(元)',
      dataIndex: 'bank_transfer_amount'
    },
    {
      title: '内部结转(元)',
      dataIndex: 'internal_amount'
    },
    {
      title: '其它(元)',
      dataIndex: 'other_amount'
    }
  ]
}
